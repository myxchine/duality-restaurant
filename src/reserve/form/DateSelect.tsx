import { generateDateOptions } from "@/lib/helpers";

interface DateSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelect: React.FC<DateSelectProps> = ({ value, onChange }) => (
  <div>
    <select
      id="date"
      name="date"
      className="w-full p-2 border border-black border-opacity-10 rounded custom-select bg-transparent"
      value={value}
      onChange={onChange}
      required
    >
      {generateDateOptions().map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default DateSelect;
