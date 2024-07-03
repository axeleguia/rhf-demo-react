import { FieldValues, useFormContext } from "react-hook-form";

type ButtonProps = {
  label: string;
  onSubmit: (data: T) => void;
};

export const Button = <T extends FieldValues>({
  label,
  onSubmit,
}: ButtonProps) => {
  const { handleSubmit } = useFormContext<T>();
  return (
    <button type="submit" onClick={handleSubmit(onSubmit)}>
      {label}
    </button>
  );
};
