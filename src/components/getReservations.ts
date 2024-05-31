"use client";

import {
  getRecentReservations,
  getReservationsFromDate,
  Reservation,
} from "@/utils/queries";
import { useEffect } from "react";

interface FetchReservationsDataParams {
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  setTodaysReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  selectedDate: string;
}

const fetchReservationsData = ({
  setReservations,
  setTodaysReservations,
  selectedDate,
}: FetchReservationsDataParams) => {
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getRecentReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching recent reservations:", error);
      }
    };
    fetchRecent();
  }, [setReservations]);

  useEffect(() => {
    const fetchFromDate = async () => {
      try {
        const data = await getReservationsFromDate(selectedDate);
        setTodaysReservations(data);
      } catch (error) {
        console.error("Error fetching reservations from date:", error);
      }
    };
    if (selectedDate) {
      fetchFromDate();
    }
  }, [selectedDate, setTodaysReservations]);
};

export default fetchReservationsData;
