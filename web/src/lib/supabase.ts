import { createClient } from '@supabase/supabase-js'

/* Same project and publishable key the live app uses (djyaiyasgytendldrtpa) -
   this key is meant to be public, access is controlled by row-level security
   on the database side, not by keeping this value secret. */
const SUPABASE_URL = 'https://djyaiyasgytendldrtpa.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__Lg2WFYhA212kD2M7z2fhQ_otKuP8kO'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
