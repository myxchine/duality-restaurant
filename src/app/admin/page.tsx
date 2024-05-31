"use client";

import { useState } from "react";
import Header from "@/components/elements/admin/header";
import Footer from "@/components/elements/admin/footer";
import { Reservation } from "@/utils/queries";
import TimeTable from "@/components/elements/admin/dayView";
import MainView from "@/components/elements/admin/mainView";
import GetReservations from "@/components/getReservations";
import NewResModal from "@/components/NewResModal";
import Nav from "@/components/elements/admin/nav";
import Clock from "@/components/elements/admin/clock";

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());
  const [newReservation, setNewReservation] = useState<boolean>(false);
  const [todaysReservations, setTodaysReservations] = useState<{
    [key: string]: Reservation;
  }>({});
  const [view, setView] = useState<string>("main");
  const [timeSlotsGuests, setTimeSlotsGuests] = useState<{
    [key: string]: Reservation;
  }>({});

  GetReservations({
    setReservations,
    setTodaysReservations,
    selectedDate,
  });

  return (
    <>
      {newReservation && (
        <NewResModal
          setNewReservation={setNewReservation}
          newReservation={newReservation}
        />
      )}
      <main className="flex flex-col items-center justify-center w-full ">
        <div className="max-w-7xl w-full flex flex-col items-center justify-center p-4 space-y-8 ">
          <Header />
          <Clock />

          <Nav setView={setView} />

          {view === "main" && (
            <TimeTable
              reservations={todaysReservations}
              setTimeSlotsGuests={setTimeSlotsGuests}
              timeSlotsGuests={timeSlotsGuests}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {view === "manage" && (
            <MainView
              setReservations={setReservations}
              reservations={reservations}
              newReservation={newReservation}
              setNewReservation={setNewReservation}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
