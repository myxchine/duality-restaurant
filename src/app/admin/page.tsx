"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/elements/admin/header";
import Footer from "@/components/elements/admin/footer";
import { getRecentReservations } from "@/utils/queries";
import TimeTable from "@/components/elements/admin/dayView";
import { get } from "http";

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
      <Header />
      <main className="flex flex-col items-center justify-center h-max p-12 ">
        <TimeTable selectedDate={selectedDate} />
        <div className=" rounded-lg p-8 shadow-md space-y-8 w-full bg-white bg-opacity-90">
          <h1 className="text-3xl font-bold">Reservations</h1>
          <table className="table-auto w-full space-y-4">
            <thead>
              <tr className="text-left">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="text-left border-b pb-4">
                  <td className="text-black text-opacity-50 p-4 pl-0">
                    <Link href={`/reservations/${reservation.id}`}>
                      {truncateText(reservation.id, 4)}
                    </Link>
                  </td>
                  <td className="p-4 pl-0">
                    {" "}
                    {truncateText(reservation.name, 10)}
                  </td>
                  <td className="p-4 pl-0">
                    {" "}
                    {truncateText(reservation.email, 10)}
                  </td>

                  <td className="p-4 pl-0"> {reservation.date}</td>
                  <td className="p-4 pl-0"> {reservation.time}</td>
                  <td className="p-4 pl-0"> {reservation.guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default AdminPage;
