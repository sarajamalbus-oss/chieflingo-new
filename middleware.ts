import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
  "/api/admin(.*)",  // ← أضيفي السطر ده
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect(); 
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
