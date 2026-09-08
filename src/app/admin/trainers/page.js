import { requireAdminPage } from "@/lib/adminAuth";
import TrainersEditor from "./TrainersEditor";

export default function AdminTrainersPage() {
  requireAdminPage();
  return <TrainersEditor />;
}
