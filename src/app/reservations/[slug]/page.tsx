"use server";
import { getReservation } from "@/utils/queries";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const reservation = getReservation(params.slug);

  if (!reservation) {
    return <div>Rservation not found</div>;
  }

  return (
    <div className="px-4 py-8">
      <h1>{reservation.name}'s Reservation Details</h1>
      <p>Email: {reservation.email}</p>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Number of Guests: {reservation.guests}</p>
    </div>
  );
}
