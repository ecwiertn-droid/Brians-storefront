import { requireAdminPage } from "@/lib/adminAuth";
import ScheduleEditor from "./ScheduleEditor";

export default function AdminSchedulePage() {
  requireAdminPage();
  return <ScheduleEditor />;
}
