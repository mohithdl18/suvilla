
import RoomAvailability from "@/components/Booking/RoomAvailability";
import BookingForm from "@/components/Booking/BookingForm";

export default function BookingsPage() {
  return (
    <main className="min-h-screen space-y-10 bg-white text-gray-900">
      <RoomAvailability />

      <hr className="mx-auto max-w-6xl border-slate-200" />

      <BookingForm />
    </main>
  );
}
