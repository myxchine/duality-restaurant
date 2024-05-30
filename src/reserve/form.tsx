import React, { useState } from "react";
import { supabase } from "../lib/supabase"; // Check if the path is correct

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

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit }) => {
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
          className="w-full p-4 border rounded"
          placeholder="Your Name..."
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
          className="w-full p-4 border rounded"
          placeholder="Your Email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full p-4 border rounded"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="time"
          id="time"
          name="time"
          className="w-full p-4 border rounded"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <select
          id="guests"
          name="guests"
          className="w-full p-4 border rounded"
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
