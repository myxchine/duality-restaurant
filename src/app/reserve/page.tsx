import ReservationForm from "@/reserve/form";

const ReservationPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full fixed full-screen p-8">
      <div className=" rounded-lg p-8 shadow-md space-y-6 w-full max-w-lg   bg-white bg-opacity-30">
        <h1 className="text-xl font-bold uppercase">Make your reservation</h1>
        <ReservationForm />
      </div>
    </main>
  );
};

export default ReservationPage;
