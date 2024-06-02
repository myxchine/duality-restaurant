import React, { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Time from "@/components/admin/time";
import DateSelect from "@/reserve/form/DateSelectPlus";

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
    if (!guests) return "bg-gray-500";
    const red = Math.min(255, guests * 10); // Cap at 255
    const green = Math.max(0, 255 - guests * 10); // Decrease as guests increase
    return `rgb(${red}, ${green}, 0)`; // Green to Red gradient
  };

  return (
    <div className="space-y-8 w-full">
      <div className="rounded-lg p-8 shadow-md w-full bg-white bg-opacity-50 space-y-2">
        <DateSelect
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <table className="table-auto w-full ">
          <thead>
            <tr>
              {timeSlots.map((timeSlot) => (
                <th className="display-none" key={timeSlot}></th>
              ))}
            </tr>
          </thead>
          <tbody className="rounded-full border overflow-hidden">
            <tr>
              {timeSlots.map((timeSlot) => (
                <td
                  className="text-xs font-regular border-none p-0"
                  key={timeSlot}
                >
                  <div
                    className="h-12 flex items-center bg-black bg-opacity-10 justify-center"
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
      <div className=" w-full min-h-[400px] space-y-2 ">
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation: any) => (
            <div
              key={reservation.id}
              className="flex flex-col bg-white bg-opacity-50 md:flex-row md:justify-between w-full justify-center align-middle items-left text-center p-8  shadow-md rounded-lg"
            >
              <div className="flex items-center p-4 pt-0 pl-0 md:p-0">
                <p className="">
                  {reservation.name} for {reservation.guests} at{" "}
                  {reservation.time}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 border bg-blue-400 text-white uppercase text-xs rounded-xl flex items-center justify-center w-[100px]">
                  <Time targetTime={`${selectedDate}T${reservation.time}`} />
                </div>
                <div className="p-2 border bg-orange-400 text-white uppercase text-xs rounded-xl flex items-center justify-center w-[100px]">
                  {reservation.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full  text-center font-bold rounded-lg py-8 bg-white bg-opacity-50">
            Nothing yet
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
