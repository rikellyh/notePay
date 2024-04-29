import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const FieldTypeInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type = "text", ...rest }, ref) => {
    return (
      <>
        <input {...rest} type={type} name={name} ref={ref} />
      </>
    );
  }
);
