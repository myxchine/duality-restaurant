"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  ReservationFormData,
  getCurrentDate,
  getCurrentTimePlusHour,
  isTimeAtLeast30MinutesAway,
} from "@/lib/helpers";
import NameInput from "./form/NameInput";
import EmailInput from "./form/EmailInput";
import DateSelect from "./form/DateSelect";
import TimeSelect from "./form/TimeSelect";
import GuestsSelect from "./form/GuestSelect";
import SubmitButton from "./form/SubmitButton";
import { useRouter } from "next/navigation";
import Email from "@/lib/email";

const ReservationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    email: "",
    date: getCurrentDate(),
    time: getCurrentTimePlusHour(1),
    guests: 1,
  });
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, date, time, guests } = formData;

    if (!isTimeAtLeast30MinutesAway(date, time)) {
      setStatus(
        "Reservation time must be at least 30 minutes from the current time."
      );
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("reservations")
        .insert([{ name, email, date, time, guests }])
        .select("id"); // Make sure to select the id

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const newReservationId = data[0].id;
        const newEmail = await Email(name, email, newReservationId);

        console.log("Reservation created with ID:", newReservationId);
        router.push(`/reservations/${newReservationId}`);
      }

      setStatus("Reservation successfull.");

      setFormData({
        name: "",
        email: "",
        date: getCurrentDate(),
        time: "",
        guests: 1,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error creating reservation:", error);
      setLoading(false); // Ensure loading state is updated on error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form space-y-4 w-full">
      <NameInput value={formData.name} onChange={handleChange} />
      <EmailInput value={formData.email} onChange={handleChange} />
      <DateSelect value={formData.date} onChange={handleChange} />
      <TimeSelect value={formData.time} onChange={handleChange} />
      <GuestsSelect value={formData.guests} onChange={handleChange} />
      <SubmitButton loading={loading} />
      {status && (
        <p className="w-full text-center text-sm text-black ">{status}</p>
      )}
    </form>
  );
};

export default ReservationForm;
