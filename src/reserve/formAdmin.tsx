import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface ReservationFormProps {
  onSubmit: (formData: ReservationFormData) => void;
}

export interface ReservationFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString("en-UK", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const generateDateOptions = (): { value: string; label: string }[] => {
  const options = [];
  const today = new Date();

  for (let i = -5; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    let label = "";
    if (i === 0) {
      label = "Today";
    } else if (i === 1) {
      label = "Tomorrow";
    } else if (i === -1) {
      label = "Yesterday";
    } else {
      label = formatShortDate(date);
    }

    options.push({ value: date.toISOString().split("T")[0], label });
  }

  return options;
};

const generateTimeOptions = (): string[] => {
  const options = [];
  const endHour = 22;
  const intervalsPerHour = 4;
  const startHour = 9;

  for (
    let i = startHour * intervalsPerHour;
    i <= endHour * intervalsPerHour;
    i++
  ) {
    const hour = Math.floor(i / intervalsPerHour);
    const minute = (i % intervalsPerHour) * 15;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    options.push(`${formattedHour}:${formattedMinute}`);
  }

  return options;
};

const ReservationForm: React.FC<ReservationFormProps> = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    email: "",
    date: getCurrentDate(),
    time: "",
    guests: 1,
  });

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
    const { data, error } = await supabase
      .from("reservations")
      .insert([{ name, email, date, time, guests }]);
    if (error) {
      console.error("Error creating reservation:", error.message);
    } else {
      console.log("Reservation created:", data);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        date: getCurrentDate(),
        time: "",
        guests: 1,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form space-y-4">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border rounded"
          placeholder="Customer Name..."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border rounded"
          placeholder="Customer Email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <select
          id="date"
          name="date"
          className="w-full p-2 border rounded custom-select"
          value={formData.date}
          onChange={handleChange}
          required
        >
          {generateDateOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="time"
          name="time"
          className="w-full p-2 border rounded custom-select"
          value={formData.time}
          onChange={handleChange}
          required
        >
          {generateTimeOptions().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="guests"
          name="guests"
          className="w-full p-2 border rounded custom-select"
          value={formData.guests}
          onChange={handleChange}
          required
        >
          <option value={1}>1 person</option>
          <option value={2}>2 people</option>
          <option value={3}>3 people</option>
          <option value={4}>4 people</option>
          <option value={5}>5 people</option>
          <option value={6}>6 people</option>
          <option value={7}>7 people</option>
          <option value={8}>8 people</option>
          <option value={9}>9 people</option>
          <option value={10}>10 people</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-4 border rounded bg-black text-white hover:bg-white hover:text-black"
      >
        Reserve now
      </button>
    </form>
  );
};

export default ReservationForm;
