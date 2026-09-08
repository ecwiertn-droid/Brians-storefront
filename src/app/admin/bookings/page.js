import { requireAdminPage } from "@/lib/adminAuth";
import BookingsList from "./BookingsList";

export default function AdminBookingsPage() {
  requireAdminPage();
  return <BookingsList />;
}
