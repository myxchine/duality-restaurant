"use client";

import ReservationForm, { ReservationFormData } from "@/reserve/form";

const ReservationPage: React.FC = () => {
  const handleFormSubmit = (formData: ReservationFormData) => {
    console.log("Reservation data:", formData);
  };

  return (
    <main className="flex flex-col items-center justify-center fixed full-screen p-12 ">
      <div className=" rounded-lg p-8 shadow-md space-y-6 w-full max-w-lg   bg-white bg-opacity-90">
        <h1 className="text-xl font-bold">Make your reservation</h1>
        <ReservationForm onSubmit={handleFormSubmit} />
      </div>
    </main>
  );
};

export default ReservationPage;
