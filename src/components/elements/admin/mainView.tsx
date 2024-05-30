import { useState } from "react";
import Link from "next/link";
import { deleteReservation } from "@/utils/edits";
import { FiTrash } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";

const MainView = ({
  reservations,
  setReservations,
  newReservation,
  setNewReservation,
}: any) => {
  const [selectedReservations, setSelectedReservations] = useState<string[]>(
    []
  );

  const toggleReservationSelection = (id: string) => {
    const isSelected = selectedReservations.includes(id);
    if (isSelected) {
      setSelectedReservations(selectedReservations.filter((r) => r !== id));
    } else {
      setSelectedReservations([...selectedReservations, id]);
    }
  };

  const deleteSelectedReservations = () => {
    selectedReservations.forEach((id) => {
      deleteReservation(id);
      setReservations((prevReservations: any) =>
        prevReservations.filter((r: any) => r.id !== id)
      );
    });
    setSelectedReservations([]);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const toggleAddReservation = () => {
    setNewReservation(!newReservation);
  };

  return (
    <div className="rounded-lg p-8 shadow-md space-y-8 w-full bg-white  bg-opacity-30">
      <div className="flex justify-between items-center space-x-4">
        <h1 className="text-3xl font-bold uppercase ">Reservations</h1>
        <div className="space-x-4">
          <button
            className="text-black text-opacity-100 hover:text-red rounded border-2 border-black p-2 "
            onClick={toggleAddReservation}
          >
            <div className="flex justify-center items-center space-x-2">
              <IoMdAddCircleOutline />
              <p className="text-sm">New Reservation</p>
            </div>
          </button>
          {selectedReservations.length > 0 && (
            <button
              className="text-black text-opacity-100 hover:text-red rounded border-2 border-black p-2 "
              onClick={deleteSelectedReservations}
              disabled={selectedReservations.length === 0}
            >
              <div className="flex justify-center items-center space-x-2">
                <FiTrash />
                <p className="text-sm">
                  Delete {selectedReservations.length} reservations
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="min-h-[400px]">
        <table className="table-auto w-full space-y-4 ">
          <thead>
            <tr className="text-left">
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations && reservations.length > 0 ? (
              reservations.map((reservation: any) => (
                <tr key={reservation.id} className="text-left border-b pb-4">
                  <td className="p-4 pl-0">
                    <input
                      type="checkbox"
                      checked={selectedReservations.includes(reservation.id)}
                      onChange={() =>
                        toggleReservationSelection(reservation.id)
                      }
                    />
                  </td>
                  <td className="text-black text-opacity-50 p-4 pl-0">
                    <Link href={`/reservations/${reservation.id}`}>
                      {truncateText(reservation.id, 4)}
                    </Link>
                  </td>
                  <td className="p-4 pl-0">
                    {truncateText(reservation.name, 10)}
                  </td>
                  <td className="p-4 pl-0">
                    {truncateText(reservation.email, 10)}
                  </td>
                  <td className="p-4 pl-0">{reservation.date}</td>
                  <td className="p-4 pl-0">{reservation.time}</td>
                  <td className="p-4 pl-0">{reservation.guests}</td>
                  <td className="p-4 pl-0">{reservation.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainView;
