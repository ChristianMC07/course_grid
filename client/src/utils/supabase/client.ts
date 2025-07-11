import { createClient } from "@supabase/supabase-js"

export function createSupabaseClient(token: string | null) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            },
        },
    );

    return supabase;
}