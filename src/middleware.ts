import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Eingeloggter User versucht /login-magic-link aufzurufen → direkt zu /board
  if (user && pathname === "/login-magic-link") {
    const boardUrl = request.nextUrl.clone()
    boardUrl.pathname = "/board"
    return NextResponse.redirect(boardUrl)
  }

  // Nicht eingeloggter User versucht /board aufzurufen → zu /login-magic-link
  if (!user && pathname.startsWith("/board")) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login-magic-link"
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

// Auf Login(-magic-link) und Board aktiv
export const config = {
  matcher: ["/board/:path*", "/login-magic-link"],
}
