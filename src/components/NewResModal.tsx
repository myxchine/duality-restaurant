import Form from "@/reserve/formAdmin";
import { IoClose } from "react-icons/io5";

const Modal = ({
  newReservation,
  setNewReservation,
}: {
  newReservation: boolean;
  setNewReservation: (value: boolean) => void;
}) => {
  const toggleAddReservation = () => {
    setNewReservation(!newReservation);
  };

  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 p-12 bg-opacity-50 bg-black">
      <div className="rounded-lg p-8 shadow-md space-y-6 w-full max-w-lg bg-white bg-opacity-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Add a new reservation</h1>
          <button
            onClick={toggleAddReservation}
            className="text-black text-xl p-2"
          >
            <IoClose />
          </button>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Modal;
