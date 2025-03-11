import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];
const isPublic = createRouteMatcher(publicRoutes);

// This middleware protects routes and handles authentication
export default clerkMiddleware((auth, req) => {
  if (isPublic(req)) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
