"use client";

import { useState, useContext } from "react";
import { MyContext } from "./context";
import Time from "@/components/admin/time";
import DateSelect from "@/components/admin/DateSelectPlus";
import { IoIosArrowRoundBack } from "react-icons/io";

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

  const { reservationsFromDate, getReservationsFromDateFromClient } = context;

  const handleChangeDate = (e: any) => {
    e.preventDefault();
    const newDate = e.target.value;
    setSelectedDate(newDate);
    getReservationsFromDateFromClient(newDate);
  };

  const addOneDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    const newDateString = newDate.toISOString().slice(0, 10);
    setSelectedDate(newDateString);
    getReservationsFromDateFromClient(newDateString);
  };

  const minusOneDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    const newDateString = newDate.toISOString().slice(0, 10);
    setSelectedDate(newDateString);
    getReservationsFromDateFromClient(newDateString);
  };

  return (
    <div className="space-y-4 w-full p-4 bg-white">
      <h1 className="text-xl font-bold pb-0 uppercase">Overview</h1>

      <div className="">
        <div className="flex items-center justify-between  w-full rounded-lg px-4 border border-gray-300 p-2">
          <button className="" onClick={() => addOneDay()}>
            <IoIosArrowRoundBack className="text-3xl " />
          </button>
          <DateSelect value={selectedDate} onChange={handleChangeDate} />

          <button className="" onClick={() => minusOneDay()}>
            <IoIosArrowRoundBack
              className="text-3xl "
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
        </div>
      </div>

      <div className=" w-full space-y-2 ">
        {reservationsFromDate && reservationsFromDate.length > 0 ? (
          reservationsFromDate.map((reservation: any) => (
            <div
              key={reservation.id}
              className="flex flex-col bg-white bg-opacity-50 md:flex-row md:justify-between w-full justify-center align-middle items-left text-center p-4 md:p-8 border border-gray-300 rounded-lg  overflow-hidden"
            >
              <div className="flex items-center p-4 pt-0 pl-0 md:p-0">
                <p className="">
                  {reservation.name} for {reservation.guests} at{" "}
                  {reservation.time}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 border bg-black  text-white uppercase text-xs rounded-xl flex items-center justify-center w-[100px]">
                  <Time targetTime={`${selectedDate}T${reservation.time}`} />
                </div>
                <div className="p-2 border  text-black border-black uppercase text-xs rounded-xl flex items-center justify-center w-[100px]">
                  {reservation.status}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full  text-center  rounded-lg py-8 bg-white bg-opacity-50">
            Nothing yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
