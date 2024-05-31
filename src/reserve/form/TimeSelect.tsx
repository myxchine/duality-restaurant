import { generateTimeSlots } from "@/lib/helpers";

interface TimeSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange }) => {
  const options = generateTimeSlots(9 * 60, 22 * 60, 15);

  return (
    <div>
      <select
        id="time"
        name="time"
        className="w-full p-2 border  border-black border-opacity-10 rounded custom-select bg-transparent"
        value={value}
        onChange={onChange}
        required
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelect;
