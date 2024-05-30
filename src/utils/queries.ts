"use server";

import { supabase } from "@/lib/supabase";

export const getReservation = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
};

export const getRecentReservations = async () => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching recent reservations:", error);
    throw error;
  }
};
