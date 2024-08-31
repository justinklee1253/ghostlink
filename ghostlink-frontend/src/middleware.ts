import { clerkMiddleware, createRouteMatcher, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a matcher for the protected route
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/uploadVideo(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    
    if (!userId) {
      // User is not authenticated
      return new NextResponse(
        JSON.stringify({ message: "You must be logged in to access this page." }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }
    
    // TODO: Add subscription check here in the future
    // For now, you can uncomment the following lines to manually check a flag
    // const { sessionClaims } = auth();
    // if (!sessionClaims?.subscribed) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "You must have an active subscription to access this page." }),
    //     { status: 403, headers: { "content-type": "application/json" } }
    //   );
    // }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};