import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidV4 } from "uuid";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
import { usePageTransition } from "../../hooks/useTransitionPage";
import { loadStoredFinances } from "../../utils/localStorage";
import { formatCurrency } from "../../utils/formatTotalValue";

import Header from "../../components/Header";
import { FieldTypeInput } from "./components/FieldTypeInput";
import { BoxInfoValues } from "./components/BoxInfoValues";
import { ModalEditFinance } from "./components/ModalEditFinance";
import { ModalDeleteFinances } from "./components/ModalDeleteFinances";

import ImgNotResults from "../../assets/people.jpg";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [finances, setFinances] = useState<Finance[]>(loadStoredFinances());
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { fadeOut } = usePageTransition();
  const totalValueFormatted = formatCurrency(finances);
  const typeValueArray = ["Entrada", "Saída"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Finance>({
    resolver: yupResolver(CreateTypeValueSchema),
  });

  const handleOpenModalEdit = (id: string) => {
    const finance = getFinanceById(id);

    if (finance) {
      setOpenModalEdit(true);
      setSelectedFinance(finance);
    }
  };
  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

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

  const deleteAllFinances = () => {
    setFinances([]);
    localStorage.removeItem("finance");
    handleCloseModalDelete();
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
        open={openModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        typeValueArray={typeValueArray}
        selectedFinance={selectedFinance}
        updateFinance={updateFinance}
      />
      <ModalDeleteFinances
        open={openModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        deleteAllFinances={deleteAllFinances}
      />
      <section
        className={`Container--Dashboard ${fadeOut ? "fade-out" : "fade-in"}`}
      >
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
            <BoxInfoValues sum={totalValueFormatted} />
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
                    <TableCell>
                      <button
                        type="button"
                        onClick={handleOpenModalDelete}
                        className="Btn--Clear__All"
                      >
                        <CancelOutlinedIcon sx={{ fontSize: "1rem" }} />
                        Limpar
                      </button>
                    </TableCell>
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
                          onClick={() =>
                            item.id && handleOpenModalEdit(item.id)
                          }
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
