export const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
export const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
export const SUPABASE_SERVICE_ROLE_KEY =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
export const SUPABASE_JWT_SECRET = Deno.env.get("_SUPABASE_JWT_SECRET") || "";
export const OPEN_AI_KEY = Deno.env.get("OPEN_AI_TEST_KEY") || "";
export const REQ_ID_HDR = "x-client-info";