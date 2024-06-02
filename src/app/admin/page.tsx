"use client";

import { useState, useContext } from "react";
import { MyContext } from "./context";
import { Reservation } from "@/utils/queries";
import TimeTable from "@/components/admin/dayView";

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AdminPage = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("MyContext must be used within a MyProvider");
  }
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  const [timeSlotsGuests, setTimeSlotsGuests] = useState<{
    [key: string]: Reservation;
  }>({});

  const { reservationsFromDate, getReservationsFromDateFromClient } = context;

  //  getReservationsFromDateFromClient(selectedDate);

  return (
    <main className="w-full">
      <div className=" w-full flex flex-col items-center justify-center p-4 md:p-8 space-y-8 ">
        <TimeTable
          reservations={reservationsFromDate}
          setTimeSlotsGuests={setTimeSlotsGuests}
          timeSlotsGuests={timeSlotsGuests}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          getReservationsFromDateFromClient={getReservationsFromDateFromClient}
        />
      </div>
    </main>
  );
};

export default AdminPage;
