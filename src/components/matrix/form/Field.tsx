import { ChangeEvent, FC } from "react";

interface FieldProps {
  label: string;
  field: string;
  defaultValue: number;
  onChange: (newValue: ChangeEvent<HTMLInputElement>) => void;
}

const Field: FC<FieldProps> = ({ label, field, defaultValue, onChange }) => {
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <input
        type="number"
        id={field}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Field;
