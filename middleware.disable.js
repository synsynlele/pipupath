import { updateSession }
from "./lib/supabase/middleware";

export async function middleware(request) {

  return await updateSession(request);

}

export const config = {

  matcher: [

    /*
     * Match all request paths except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     */

    "/((?!_next/static|_next/image|favicon.ico).*)",

  ],

};