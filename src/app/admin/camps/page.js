import { requireAdminPage } from "@/lib/adminAuth";
import CampsEditor from "./CampsEditor";

export default function AdminCampsPage() {
  requireAdminPage();
  return <CampsEditor />;
}
