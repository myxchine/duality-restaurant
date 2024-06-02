"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getRecentReservations,
  getReservationsFromDate,
} from "@/utils/queries";

interface MyContextType {
  recentReservations: any[];
  reservationsFromDate: any[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  getRecentReservationsFromClient: () => void;
  getReservationsFromDateFromClient: (date: string) => void;
}

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentReservations, setRecentReservations] = useState<any[]>([]);
  const [reservationsFromDate, setReservationsFromDate] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  const getRecentReservationsFromServer = useCallback(async () => {
    setRecentReservations([]);
    const data = await getRecentReservations();
    setRecentReservations(data);
  }, []);

  const getReservationsFromDateFromServer = useCallback(
    async (date: string) => {
      setReservationsFromDate([]);
      const data = await getReservationsFromDate(date);
      setReservationsFromDate(data);
    },
    []
  );

  useEffect(() => {
    // Initial data fetch
    getRecentReservationsFromServer();
    getReservationsFromDateFromServer(selectedDate);
  }, [getRecentReservationsFromServer, getReservationsFromDateFromServer]);

  const getRecentReservationsFromClient = () => {
    getRecentReservationsFromServer();
  };

  const getReservationsFromDateFromClient = (date: string) => {
    getReservationsFromDateFromServer(date);
  };

  const sharedState: MyContextType = {
    recentReservations,
    reservationsFromDate,
    getRecentReservationsFromClient,
    getReservationsFromDateFromClient,
    selectedDate,
    setSelectedDate,
  };

  return (
    <MyContext.Provider value={sharedState}>{children}</MyContext.Provider>
  );
};

export { MyProvider, MyContext };
