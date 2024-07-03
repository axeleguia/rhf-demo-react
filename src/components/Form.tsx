import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "./Button";
import { InputText } from "./InputText";
import { TextArea } from "./TextArea";

type FormData = {
  title: string;
  description: string;
};

const schema = yup
  .object({
    title: yup.string().required().max(45),
    description: yup.string().required().max(100),
  })
  .required();

export const Form = () => {
  const controls = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { control, handleSubmit, reset, setFocus, watch } = controls;

  const onSubmit = (data: FormData) => {
    if (data) {
      setFocus("title");
      reset();
    }
  };

  return (
    <>
      <FormProvider {...controls}>
        <form onSubmit={handleSubmit(onSubmit)} className="pico">
          <InputText
            fieldName="title"
            label="Title"
            placeholder="Summarize your post"
          ></InputText>
          <TextArea
            fieldName="description"
            placeholder="What are you thinking?"
            maxLength={100}
          ></TextArea>
          <Button label="Send" onSubmit={onSubmit} />
        </form>
        <article className="pico">
          <pre style={{ padding: "2rem", textWrap: "wrap" }}>
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </article>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};
