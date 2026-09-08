import { requireAdminPage } from "@/lib/adminAuth";
import HoursEditor from "./HoursEditor";

export default function AdminHoursPage() {
  requireAdminPage();
  return <HoursEditor />;
}
