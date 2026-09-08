import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "bsb_admin_auth";

// Very lightweight shared-password gate for the /admin section. Good enough
// for a single-owner prototype; swap for Supabase Auth (real accounts) once
// more than one person needs admin access. See the setup guide for notes.
export function isAdminAuthed() {
  const cookieStore = cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "ok";
}

export function adminCookieName() {
  return COOKIE_NAME;
}

// Call at the top of every admin page component (not the login page itself).
export function requireAdminPage() {
  if (!isAdminAuthed()) {
    redirect("/admin/login");
  }
}
