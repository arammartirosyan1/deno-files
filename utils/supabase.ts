import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "../shared/config.ts";
import { InsertRowArgs, UpdateRowArgs, UpsertRowArgs } from "../interfaces/supabase.ts";
import { PostgrestError, createClient } from "../shared/dependencies.ts";

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
);

export const supabaseAnon = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  },
);

export function supabaseClient(key: string) {
  const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: `Bearer ${key}` },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );
  return supabaseClient;
}

export async function supabaseCLientUpsert(
  { tableName, record, access_token, onConflict }: UpsertRowArgs,
): Promise<any | PostgrestError> {
  const { data, error } = await supabaseClient(access_token)
    .from(tableName)
    .upsert(record, { onConflict });

  if (error) return { error };

  return { data };
}

export async function supabaseCLientUpdate(
  { tableName, record, access_token, match }: UpdateRowArgs,
): Promise<any | PostgrestError> {
  const { data, error } = await supabaseClient(access_token)
    .from(tableName)
    .update(record)
    .match(match);

  if (error) return { error };

  return { data };
}


export async function supabaseCLientInsert(
  { tableName, record, access_token }: InsertRowArgs,
): Promise<any | PostgrestError> {
  const { data, error } = await supabaseClient(access_token)
    .from(tableName)
    .insert(record);

  if (error) return { error };

  return { data };
}
