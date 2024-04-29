import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidV4 } from "uuid";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Finance } from "../../types/finance";
import { CreateTypeValueSchema } from "../../schemas";
import { loadStoredFinances } from "../../utils/localStorage";

import Header from "../../components/Header";
import { FieldTypeInput } from "./components/FieldTypeInput";

import ImgNotResults from "../../assets/people.jpg";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [finances, setFinances] = useState<Finance[]>(loadStoredFinances());

  const typeValueArray = ["Entrada", "Saída"];

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

  useEffect(() => {
    localStorage.setItem("finance", JSON.stringify(finances));
  }, [finances]);

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
                  <FieldTypeInput
                    type="text"
                    placeholder="Digite aqui sua descrição"
                    register={register("description")}
                  />
                  <p className="errorMessage">{errors.description?.message}</p>
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={6}>
                  <label htmlFor="value">Valor</label>
                  <div id="InfoValues__Field--Value">
                    <FieldTypeInput
                      type="number"
                      register={register("value")}
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
          {finances && finances.length ? (
            <div className="InfoValues--Box">
              <div>
                <h2>Valor total:</h2>
                <span>O valor se refere ao saldo</span>
              </div>
              <div>
                <p>R$1.000,00</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <main>
          {finances && finances.length ? (
            <TableContainer sx={{ maxHeight: "75vh" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {finances.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.typeValue}</TableCell>
                      <TableCell>
                        <button>a</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <img
                src={ImgNotResults}
                alt="ilustração de pessoas procurando algo"
              />
              <span>Nada de registros ainda...</span>
            </>
          )}
        </main>
      </section>
    </>
  );
};

export default Dashboard;
