"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const TimeTable: React.FC<{ selectedDate: string }> = ({ selectedDate }) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("time")
          .eq("date", selectedDate);

        if (error) {
          throw error;
        }

        const bookedTimes = data.map((reservation: any) => reservation.time);
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = 9 * 60; // Start time in minutes (9:00)
    const endTime = 22 * 60; // End time in minutes (22:00)
    const interval = 15; // 15-minute intervals

    for (let i = startTime; i <= endTime; i += interval) {
      const hours = Math.floor(i / 60);
      const minutes = i % 60;
      const timeString = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      timeSlots.push(timeString);
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <table>
      <caption> {selectedDate}</caption>
      <thead>
        <tr>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <td>{timeSlot}</td>
            <td>{bookedSlots.includes(timeSlot) ? "U" : "A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
