import * as yup from "yup";

export const CreateTypeValueSchema = yup.object().shape({
  description: yup.string().required("*Descrição obrigatória"),
  value: yup
    .string()
    .required("*Valor obrigatório")
    .test("no-comma", "O valor não pode conter vírgula", (value) => {
      if (typeof value === "string") {
        return !value.includes(",");
      }
      return true;
    })
    .test("only-numbers", "O valor deve conter apenas números", (value) => {
      if (typeof value === "string") {
        return /^\d*\.?\d*$/.test(value);
      }
      return true;
    }),
  typeValue: yup.string().required("*Selecione o tipo"),
});
