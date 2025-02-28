import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidV4 } from "uuid";

import { CreateTypeValueSchema } from "../../../../schemas";
import { Finance } from "../../../../types/finance";

import { FieldTypeInput } from "../FieldTypeInput";
import { Grid } from "@mui/material";

interface FormNewFinanceProps {
  setFinances: React.Dispatch<React.SetStateAction<Finance[]>>;
  finances: Finance[];
  typeValueArray: string[];
}

export const FormNewFinance = ({
  setFinances,
  finances,
  typeValueArray,
}: FormNewFinanceProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Finance>({
    resolver: yupResolver(CreateTypeValueSchema),
  });

  const addFinance = (item: Finance) => {
    const newItem = {
      id: uuidV4(),
      ...item,
    };

    setFinances([...finances, newItem]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(addFinance)}>
      <Grid className="FormGrid--Container" container>
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            <label htmlFor="description">Descrição</label>
            <FieldTypeInput
              placeholder="Digite aqui sua descrição"
              {...register("description")}
            />
            <p className="errorMessage">{errors.description?.message}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={1}>
          <Grid item xs={6}>
            <label htmlFor="value">Valor</label>
            <div id="InfoValues__Field--Value">
              <FieldTypeInput
                type="text"
                placeholder="1"
                {...register("value")}
              />
              <div>
                <span>R$</span>
              </div>
            </div>
            <p className="errorMessage">{errors.value?.message}</p>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="typeValue">Tipo de valor</label>
            <select {...register("typeValue")} id="typeValue">
              <option value="">Selecione</option>
              {typeValueArray.map((value, index) => (
                <option value={value} key={index}>
                  {value}
                </option>
              ))}
            </select>
            <p className="errorMessage">{errors.typeValue?.message}</p>
          </Grid>
        </Grid>
      </Grid>
      <button type="submit">Inserir valor</button>
    </form>
  );
};
