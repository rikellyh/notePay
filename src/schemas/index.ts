import * as yup from "yup";

export const CreateTypeValueSchema = yup.object().shape({
  description: yup.string().required("*Descrição obrigatória"),
  value: yup.string().required("*Valor obrigatório"),
  typeValue: yup.string().required("*Selecione o tipo"),
});
