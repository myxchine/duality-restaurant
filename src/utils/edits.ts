"use server";

import { supabase } from "@/lib/supabase";

export const deleteReservation = async (id: string) => {
  try {
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      throw error;
    }

    console.log("Record deleted successfully");
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};
