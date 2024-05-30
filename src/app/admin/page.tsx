"use client";

import { useState, useEffect } from "react";
import Header from "@/components/elements/admin/header";
import Footer from "@/components/elements/admin/footer";
import { getRecentReservations } from "@/utils/queries";
import TimeTable from "@/components/elements/admin/dayView";
import MainView from "@/components/elements/admin/mainView";
import GetReservations from "@/components/getReservations";
import NewResModal from "@/components/NewResModal";

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

  <GetReservations
    reservations={reservations}
    setReservations={setReservations}
  />;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getRecentReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  return (
    <>
      {newReservation && (
        <NewResModal
          setNewReservation={setNewReservation}
          newReservation={newReservation}
        />
      )}
      <Header />
      <main className="flex flex-col items-center justify-center h-max p-12 space-y-8">
        <TimeTable selectedDate={selectedDate} />
        <MainView
          setReservations={setReservations}
          reservations={reservations}
          newReservation={newReservation}
          setNewReservation={setNewReservation}
        />
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
