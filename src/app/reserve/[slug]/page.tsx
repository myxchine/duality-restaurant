"use server";
import { getReservation } from "@/utils/queries";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const reservation = await getReservation(params.slug);
  console.log(reservation);

  if (!reservation) {
    return <div>Rservation not found</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center fixed full-screen p-12 ">
      <div className=" rounded-lg p-8 shadow-md space-y-6 w-full max-w-lg   bg-white bg-opacity-30">
        <div className="w-full space-y-2">
          <h1 className="text-2xl font-bold uppercase">
            {reservation.name}'s reservation
          </h1>
        </div>
        <div className="w-full space-y-2">
          <h2 className="text-xl font-bold">Details</h2>
          <p>On {reservation.date}</p>
          <p>At {reservation.time}</p>
          <p>For {reservation.guests} guests</p>
        </div>
      </div>
    </main>
  );
}
