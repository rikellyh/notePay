import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";

import { Finance } from "../../types/finance";
import { CreateTypeValueSchema } from "../../schemas";
import { v4 as uuidV4 } from "uuid";
import Header from "../../components/Header";

import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [finances, setFinances] = useState<Finance[]>([]);

  const typeValueArray = ["Entrada", "Saída"];

  const {
    register,
    handleSubmit,
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
  };

  return (
    <>
      <Header />
      <section className="Container--Dashboard">
        <div className="InfoValues">
          <form onSubmit={handleSubmit(addFinance)}>
            <Grid container>
              <Grid container item spacing={1}>
                <Grid item xs={12}>
                  <label htmlFor="description">Descrição</label>
                  <input
                    type="text"
                    {...register("description")}
                    placeholder="Digite aqui sua descrição"
                  />
                  <p className="errorMessage">{errors.description?.message}</p>
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={6}>
                  <label htmlFor="value">Valor</label>
                  <div id="InfoValues__Field--Value">
                    <input
                      type="number"
                      {...register("value")}
                      placeholder="1"
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
                      <option value={index} key={index}>
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
          <div className="InfoValues--Box">
            <div>
              <h2>Valor total:</h2>
              <span>O valor se refere ao saldo</span>
            </div>
            <div>
              <p>R$1.000,00</p>
            </div>
          </div>
        </div>
        <main>
          {finances && finances.length ? (
            <>
              <ul>
                {finances.map((item) => (
                  <li>{item.description}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <span>Nada</span>
            </>
          )}
        </main>
      </section>
    </>
  );
};

export default Dashboard;
