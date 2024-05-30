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
        const extendedBookedTimes = bookedTimes.flatMap((time) => {
          const [hours, minutes] = time.split(":").map(Number);
          const startTime = hours * 60 + minutes;
          const endTime = startTime + 90; // 1.5 hours in minutes

          const extendedTimes = [];
          for (let i = startTime; i < endTime; i += 15) {
            const hours = Math.floor(i / 60);
            const minutes = i % 60;
            extendedTimes.push(
              `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                2,
                "0"
              )}`
            );
          }

          return extendedTimes;
        });

        setBookedSlots(extendedBookedTimes);
        console.log("Unavailable Time Slots:", extendedBookedTimes);
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
    <div className=" rounded-lg p-8 shadow-md w-full bg-white bg-opacity-30">
      <h1 className="text-3xl font-bold uppercase">Day View</h1>
      <h3 className="text-left"> {selectedDate}</h3>

      <table className="table-auto w-full">
        <thead>
          <tr>
            {timeSlots.map((timeSlot) => (
              <th
                className="text-xs min-w-2 font-regular p-2"
                key={timeSlot}
              ></th>
            ))}
          </tr>
        </thead>
        <tbody className=" border rounded rounded-full overflow-hidden">
          <tr className="">
            {timeSlots.map((timeSlot) => (
              <td className="text-xs font-regular" key={timeSlot}>
                <div
                  className={`h-12 ${
                    bookedSlots.includes(timeSlot)
                      ? "bg-green-500"
                      : "bg-black bg-opacity-40"
                  }`}
                ></div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
