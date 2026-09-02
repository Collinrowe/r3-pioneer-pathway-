import type { Context, Config } from "@netlify/functions";

// Server-side proxy for the homepage's waitlist forms. Keeps MAILERLITE_API_KEY
// off the client. Forwards a submitted email into the matching MailerLite group.
// The site's forms target /.netlify/functions/waitlist in prod, so this file's
// default path (based on its name) lines up with no extra config.

const GROUP_IDS: Record<string, string> = {
  waitlist: "196826343013353156",
  checklist: "196826352472557314",
};

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("MAILERLITE_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server misconfigured: MAILERLITE_API_KEY not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { email?: string; list?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = (body.email || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return new Response(JSON.stringify({ error: "Invalid email address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const listKey = body.list === "checklist" ? "checklist" : "waitlist";
  const groupId = GROUP_IDS[listKey];

  let upstream: Response;
  try {
    upstream = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, groups: [groupId] }),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Upstream request failed", detail: String(err) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text();
    return new Response(
      JSON.stringify({ error: "MailerLite rejected the request", detail }),
      { status: upstream.status, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config: Config = {
  path: "/.netlify/functions/waitlist",
};
