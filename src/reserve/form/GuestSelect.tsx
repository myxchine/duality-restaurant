interface GuestsSelectProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GuestsSelect: React.FC<GuestsSelectProps> = ({ value, onChange }) => (
  <div>
    <select
      id="guests"
      name="guests"
      className="w-full p-2 border  border-black border-opacity-10 rounded custom-select bg-transparent"
      value={value}
      onChange={onChange}
      required
    >
      {[...Array(10)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1} {i === 0 ? "person" : "people"}
        </option>
      ))}
    </select>
  </div>
);

export default GuestsSelect;
