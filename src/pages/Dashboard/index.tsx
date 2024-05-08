import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidV4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  Grid,
  IconButton,
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
import { BoxInfoValues } from "./components/BoxInfoValues";
import { ModalEditFinance } from "./components/ModalEditFinance";

import ImgNotResults from "../../assets/people.jpg";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [finances, setFinances] = useState<Finance[]>(loadStoredFinances());
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);
  const [open, setOpen] = useState(false);

  const typeValueArray = ["Entrada", "Saída"];

  const totalValue = finances.reduce((accumulator, currentValue) => {
    if (currentValue.typeValue === "Entrada") {
      return accumulator + parseFloat(currentValue.value);
    } else if (currentValue.typeValue === "Saída") {
      return accumulator - parseFloat(currentValue.value);
    } else {
      return accumulator;
    }
  }, 0);

  const formattedTotalValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalValue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Finance>({
    resolver: yupResolver(CreateTypeValueSchema),
  });

  const handleOpen = (id: string) => {
    const finance = getFinanceById(id);

    if (finance) {
      setOpen(true);
      setSelectedFinance(finance);
    }
  };
  const handleClose = () => setOpen(false);

  const addFinance = (item: Finance) => {
    const newItem = {
      id: uuidV4(),
      ...item,
    };

    setFinances([...finances, newItem]);
    reset();
  };

  const deleteFinance = (id: string) => {
    const updatedFinances = finances.filter((item) => item.id !== id);

    setFinances(updatedFinances);

    localStorage.setItem("finance", JSON.stringify(updatedFinances));
  };

  const getFinanceById = (id: string) => {
    return finances.find((item) => item.id === id);
  };

  const updateFinance = (id: string, updatedItem: Partial<Finance>) => {
    const updatedFinances = finances.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedItem,
        };
      }
      return item;
    });

    setFinances(updatedFinances);
    localStorage.setItem("finance", JSON.stringify(updatedFinances));
  };

  useEffect(() => {
    localStorage.setItem("finance", JSON.stringify(finances));
  }, [finances]);

  return (
    <>
      <Header />
      <ModalEditFinance
        open={open}
        handleClose={handleClose}
        typeValueArray={typeValueArray}
        selectedFinance={selectedFinance}
        updateFinance={updateFinance}
      />
      <section className="Container--Dashboard">
        <div className="InfoValues">
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
          {finances && finances.length ? (
            <BoxInfoValues sum={formattedTotalValue} />
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
                    <TableCell>Valor (R$)</TableCell>
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
                        <IconButton
                          aria-label="delete"
                          size="small"
                          title="Deletar"
                          onClick={() => item.id && deleteFinance(item.id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          title="Editar"
                          onClick={() => item.id && handleOpen(item.id)}
                        >
                          <CreateIcon fontSize="inherit" />
                        </IconButton>
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
