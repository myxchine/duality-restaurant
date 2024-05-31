
interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ value, onChange }) => (
  <div>
    <input
      type="text"
      id="name"
      name="name"
      className="w-full p-2 border  border-black border-opacity-10 rounded bg-transparent"
      placeholder="Your Name..."
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default NameInput;
