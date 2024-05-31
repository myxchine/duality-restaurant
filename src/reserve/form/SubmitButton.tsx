import { LoaderCircle } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading }) => (
  <div>
    {!loading ? (
      <button
        type="submit"
        className="w-full p-4 border rounded bg-black text-white  shadow-none border-black"
      >
        Reserve now
      </button>
    ) : (
      <button
        disabled
        className="w-full flex items-center justify-center p-4 border rounded bg-black bg-opacity-50 text-opacity-50 text-white"
      >
        <LoaderCircle className="mr-2 spinner" />
      </button>
    )}
  </div>
);

export default SubmitButton;
