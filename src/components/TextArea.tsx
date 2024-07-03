import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = {
  fieldName: string;
  placeholder: string;
  maxLength?: number;
};
export const TextArea = ({
  fieldName,
  placeholder,
  maxLength,
}: TextAreaProps) => {
  const {
    register,
    setValue,
    trigger,
    formState: { errors, dirtyFields, isSubmitSuccessful },
  } = useFormContext();

  const [length, setLength] = useState(0);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target;
    if (maxLength && length < maxLength) {
      setLength(input.value.length);
    } else {
      input.value = input.value.slice(0, maxLength);
      setLength(input.value.length);
    }
    setValue(fieldName, input.value, { shouldDirty: true });
    trigger(fieldName);
  };

  useEffect(() => {
    setLength(0);
  }, [isSubmitSuccessful]);

  return (
    <>
      <textarea
        rows={4}
        placeholder={placeholder}
        aria-invalid={
          dirtyFields[fieldName]
            ? errors[fieldName]
              ? "true"
              : "false"
            : undefined
        }
        aria-describedby={`${fieldName}-helper`}
        {...register(fieldName)}
        onChange={onChange}
      ></textarea>
      {maxLength && (
        <small style={{ textAlign: "right" }}>
          {length}/{maxLength}
        </small>
      )}
    </>
  );
};
