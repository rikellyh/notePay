import { UseFormRegisterReturn } from "react-hook-form";

interface FieldTypeInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

export const FieldTypeInput = ({
  type,
  placeholder,
  register,
  ...props
}: FieldTypeInputProps) => {
  return (
    <input type={type} placeholder={placeholder} {...register} {...props} />
  );
};
