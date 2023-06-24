import { ChangeEvent, FC } from "react";

interface FieldProps {
  label: string;
  field: string;
  value: number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Field: FC<FieldProps> = ({ label, field, value, onChange }) => {
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <input
        type="number"
        id={field}
        value={value}
        onChange={onChange}
        min={0}
      />
    </div>
  );
};
export default Field;
