import { FC, forwardRef, Ref } from "react";

interface FieldProps {
  label: string;
  field: string;
  defaultValue: number;
  ref: Ref<HTMLInputElement> | undefined;
}

const Field: FC<FieldProps> = forwardRef(
  ({ label, field, defaultValue }, ref) => {
    return (
      <div>
        <label htmlFor={field}>{label}</label>
        <input
          type="number"
          id={field}
          defaultValue={defaultValue}
          ref={ref}
          min={0}
        />
      </div>
    );
  }
);

export default Field;
