"use client";

import ReservationForm, {
  ReservationFormData,
} from "@/reserve/form";
import Header from "@/components/elements/reserve/header";
import Footer from "@/components/elements/reserve/footer";

const ReservationPage: React.FC = () => {
  const handleFormSubmit = (formData: ReservationFormData) => {
    console.log("Reservation data:", formData);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center h-max p-12 ">
        <div className=" rounded-lg p-8 shadow-md space-y-8 w-full max-w-lg   bg-white bg-opacity-90">
          <h1 className="text-2xl font-bold">Make a Reservation</h1>
          <ReservationForm onSubmit={handleFormSubmit} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationPage;
