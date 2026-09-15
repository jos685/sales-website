import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Public routes — skip auth entirely
  if (pathname === "/forgot-password" || pathname === "/reset-password") {
    return res;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectTo = (path: string, extraParams?: Record<string, string>) => {
    const url = req.nextUrl.clone();
    url.pathname = path;
    url.search = "";
    if (extraParams) {
      Object.entries(extraParams).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const redirect = NextResponse.redirect(url);
    // Preserve any cookies Supabase wrote during this request
    res.cookies.getAll().forEach((c) => {
      redirect.cookies.set(c.name, c.value, c);
    });
    return redirect;
  };

  if (pathname.startsWith("/admin") && !user) {
    return redirectTo("/login", { next: pathname });
  }

  if (pathname === "/login" && user) {
    return redirectTo("/admin/merchandise");
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/forgot-password", "/reset-password"],
};