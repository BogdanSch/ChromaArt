import { type ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./password-input.scss";

interface PasswordInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <InputGroup className="flex-nowrap">
      <Form.Control
        type={showPassword ? "text" : "password"}
        name="password"
        className="form-password"
        value={value}
        placeholder="Enter your password"
        onChange={onChange}
        autoComplete="current-password"
        aria-describedby="passwordHelpInline"
        required
      />
      <button
        className="input-group-text"
        type="button"
        onClick={handleToggleShowPassword}
      >
        {showPassword ? (
          <i className="bi bi-eye-slash-fill"></i>
        ) : (
          <i className="bi bi-eye"></i>
        )}
      </button>
    </InputGroup>
  );
}

export default PasswordInput;
