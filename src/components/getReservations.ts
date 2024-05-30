import { getRecentReservations } from "@/utils/queries";
import { useEffect } from "react";

const getReservations = async (reservations: any, setReservations: any) => {
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

  return reservations;
};

export default getReservations;
