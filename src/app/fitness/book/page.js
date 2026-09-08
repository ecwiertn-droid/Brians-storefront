import { Suspense } from "react";
import BookingForm from "./BookingForm";

export default function BookPage() {
  return (
    <Suspense fallback={<div className="section wrap">Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}
