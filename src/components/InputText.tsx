import { useFormContext } from "react-hook-form";
import { capitalize } from "../utils/utils";

type InputTextProps = {
  fieldName: string;
  label: string;
  placeholder: string;
};

export const InputText = ({ fieldName, placeholder }: InputTextProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <>
      <input
        placeholder={placeholder}
        aria-invalid={
          dirtyFields[fieldName]
            ? errors[fieldName]
              ? "true"
              : "false"
            : undefined
        }
        aria-describedby={`${fieldName}-helper`}
        {...register("title")}
      />
      {dirtyFields[fieldName] && errors[fieldName] && (
        <small id={`${fieldName}-helper`}>
          * {capitalize(errors[fieldName]["message"])}
        </small>
      )}
    </>
  );
};
