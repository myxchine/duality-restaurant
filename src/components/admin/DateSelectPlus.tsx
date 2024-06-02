import { generateDateOptionsPlus } from "@/lib/helpers";

interface DateSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateSelect: React.FC<DateSelectProps> = ({ value, onChange }) => (
  <div>
    <select
      id="date"
      name="date"
      className="custom-select text-xl font-bold uppercase outline-none"
      value={value}
      onChange={onChange}
      required
    >
      {generateDateOptionsPlus().map((option) => (
        <option className="text-center" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default DateSelect;
