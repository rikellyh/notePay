import { useEffect } from "react";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useFinance } from "../../hooks/useFinance";
import { usePageTransition } from "../../hooks/useTransitionPage";
import { formatCurrency } from "../../utils/formatTotalValue";

import Header from "../../components/Header";
import { BoxInfoValues } from "./components/BoxInfoValues";
import { ModalEditFinance } from "./components/ModalEditFinance";
import { ModalDeleteFinances } from "./components/ModalDeleteFinances";
import { FormNewFinance } from "./components/FormNewFinance";

import ImgNotResults from "../../assets/people.jpg";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const { fadeOut } = usePageTransition();
  const {
    finances,
    openModalEdit,
    openModalDelete,
    selectedFinance,
    sortByValue,
    sortByType,
    handleCloseModalEdit,
    handleCloseModalDelete,
    handleUpdateFinance,
    handleDeleteFinance,
    handleDeleteAllFinances,
    setFinances,
    handleSortByType,
    handleSortByValue,
    handleOpenModalDelete,
    handleOpenModalEdit,
  } = useFinance();

  const totalValueFormatted = formatCurrency(finances);
  const typeValueArray = ["Entrada", "Saída"];

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
        updateFinance={handleUpdateFinance}
      />
      <ModalDeleteFinances
        open={openModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        deleteAllFinances={handleDeleteAllFinances}
      />
      <section
        className={`Container--Dashboard ${fadeOut ? "fade-out" : "fade-in"}`}
      >
        <div className="InfoValues">
          <FormNewFinance
            setFinances={setFinances}
            finances={finances}
            typeValueArray={typeValueArray}
          />
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
                    <TableCell>
                      <div
                        className="Sort--Value__Btn"
                        onClick={handleSortByValue}
                      >
                        Valor (R$)
                        {sortByValue === "asc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "1.25rem" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "1.25rem" }} />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className="Sort--Value__Btn"
                        onClick={handleSortByType}
                      >
                        Tipo
                        {sortByType === "asc" ? (
                          <ArrowDownwardIcon sx={{ fontSize: "1.25rem" }} />
                        ) : (
                          <ArrowUpwardIcon sx={{ fontSize: "1.25rem" }} />
                        )}
                      </div>
                    </TableCell>
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
                          onClick={() =>
                            item.id && handleDeleteFinance(item.id)
                          }
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
