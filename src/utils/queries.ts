import reservations from "../../mock/res.json";

export const getReservation = (id: string) => {
  return reservations.find((reservation) => reservation.id === id);
};
