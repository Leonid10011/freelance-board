import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll()
        },
        setAll(cookiesToSet) {
          // Next Server Components: cookieStore ist readonly,
          // setAll funktioniert in Route Handlers/Server Actions.
          // In Server Components nur lesen.
          cookiesToSet.forEach(async ({ name, value, options }) => {
            ;(await cookieStore).set(name, value, options)
          })
        },
      },
    },
  )
}
