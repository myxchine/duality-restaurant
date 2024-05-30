import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const TimeTable: React.FC<{
  selectedDate: string;
  setTimeSlotsGuests: any;
  timeSlotsGuests: any;
  reservations: any;
  setSelectedDate: any;
}> = ({
  timeSlotsGuests,
  selectedDate,
  setTimeSlotsGuests,
  reservations,
  setSelectedDate,
}) => {
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("time, guests")
          .eq("date", selectedDate);

        if (error) {
          throw error;
        }

        const guestsByTimeSlot: { [key: string]: number } = {};

        data.forEach((reservation: any) => {
          const { time, guests } = reservation;
          const [hours, minutes] = time.split(":").map(Number);
          const startTime = hours * 60 + minutes;
          const endTime = startTime + 90; // 1.5 hours in minutes

          for (let i = startTime; i < endTime; i += 15) {
            const slotHours = Math.floor(i / 60);
            const slotMinutes = i % 60;
            const timeSlot = `${String(slotHours).padStart(2, "0")}:${String(
              slotMinutes
            ).padStart(2, "0")}`;

            if (!guestsByTimeSlot[timeSlot]) {
              guestsByTimeSlot[timeSlot] = 0;
            }
            guestsByTimeSlot[timeSlot] += guests;
          }
        });

        setTimeSlotsGuests(guestsByTimeSlot);
        console.log("Time Slots with Guests:", guestsByTimeSlot);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, setTimeSlotsGuests]);

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

  const getBackgroundColor = (guests: number) => {
    if (!guests) return "bg-black bg-opacity-40";
    const red = Math.min(255, guests * 10); // Cap at 255
    const green = Math.max(0, 255 - guests * 10); // Decrease as guests increase
    return `rgb(${red}, ${green}, 0)`; // Green to Red gradient
  };

  return (
    <div className="space-y-8 w-full">
      <div className="rounded-lg p-8 shadow-md w-full bg-white bg-opacity-30 space-y-4">
        <h1 className="text-3xl font-bold uppercase">Day View</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-transparent border border-black border-1 rounded p-2"
        />

        <table className="table-auto w-full">
          <thead>
            <tr>
              {timeSlots.map((timeSlot) => (
                <th key={timeSlot}></th>
              ))}
            </tr>
          </thead>
          <tbody className="border rounded rounded-full overflow-hidden">
            <tr>
              {timeSlots.map((timeSlot) => (
                <td className="text-xs font-regular" key={timeSlot}>
                  <div
                    className="h-12 flex items-center justify-center"
                    style={{
                      backgroundColor: getBackgroundColor(
                        timeSlotsGuests[timeSlot]
                      ),
                    }}
                  ></div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="rounded-lg p-8 shadow-md w-full bg-white bg-opacity-30">
        <table className="table-auto w-full space-y-4 ">
          <thead>
            <tr className="text-left">
              <th>Name</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations && reservations.length > 0 ? (
              reservations.map((reservation: any) => (
                <tr key={reservation.id} className="text-left border-b pb-4">
                  <td className="p-4 pl-0">{reservation.name}</td>

                  <td className="p-4 pl-0">{reservation.guests}</td>
                  <td className="p-4 pl-0">{reservation.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
