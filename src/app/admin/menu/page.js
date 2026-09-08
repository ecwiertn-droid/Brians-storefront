import { requireAdminPage } from "@/lib/adminAuth";
import MenuEditor from "./MenuEditor";

export default function AdminMenuPage() {
  requireAdminPage();
  return <MenuEditor />;
}
