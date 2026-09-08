import { requireAdminPage } from "@/lib/adminAuth";
import NutritionResponses from "./NutritionResponses";

export default function AdminNutritionPage() {
  requireAdminPage();
  return <NutritionResponses />;
}
