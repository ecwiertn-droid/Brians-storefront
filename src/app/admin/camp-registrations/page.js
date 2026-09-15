import { requireAdminPage } from "@/lib/adminAuth";
import CampRegistrationsList from "./CampRegistrationsList";

export default function AdminCampRegistrationsPage() {
  requireAdminPage();
  return <CampRegistrationsList />;
}
