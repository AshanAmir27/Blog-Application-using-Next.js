import { withAuth } from "next-auth/middleware";

export default function middleware(req) {
  const protectedRoutes = ["/", "/dashboard", "/profile", "/settings"]; // Define protected routes

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return withAuth({
      pages: {
        signIn: "/login",
      },
    })(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!register|login|api|public).*)"], // Exclude register, login, and public routes
};
