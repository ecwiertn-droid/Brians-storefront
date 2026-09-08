export default function AdminLayout({ children }) {
  // Each page under /admin (except /admin/login) calls requireAdminPage()
  // from src/lib/adminAuth.js itself, so the redirect happens before any
  // data is fetched.
  return <>{children}</>;
}
