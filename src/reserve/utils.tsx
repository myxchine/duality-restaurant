import { supabase } from "../lib/supabase";

export interface ReservationFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

export const addReservation = async (formData: ReservationFormData) => {
  const { data, error } = await supabase.from("reservations").insert([
    {
      name: formData.name,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
    },
  ]);
  if (error) {
    console.error("Error creating reservation:", error.message);
  } else {
    console.log("Reservation created:", data);
  }
};
