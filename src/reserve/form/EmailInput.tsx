interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => (
  <div>
    <input
      type="email"
      id="email"
      name="email"
      className="w-full p-2 border  border-black border-opacity-10 rounded bg-transparent"
      placeholder="Your Email..."
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default EmailInput;
