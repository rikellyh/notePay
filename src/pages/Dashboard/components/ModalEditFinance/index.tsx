import { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Finance } from "../../../../types/finance";
import { CreateTypeValueSchema } from "../../../../schemas";

import { FieldTypeInput } from "../FieldTypeInput";

interface ModalEditFinanceProps {
  open: boolean;
  handleCloseModalEdit: () => void;
  typeValueArray: string[];
  selectedFinance: Finance | null;
  updateFinance: (id: string, updatedItem: Finance) => void;
}

export const ModalEditFinance = ({
  open,
  handleCloseModalEdit,
  typeValueArray,
  selectedFinance,
  updateFinance,
}: ModalEditFinanceProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 450,
    width: "95%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "0.5rem",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Finance>({
    resolver: yupResolver(CreateTypeValueSchema),
  });

  const financeId = selectedFinance?.id;

  const onSubmit = (data: Finance) => {
    if (financeId && selectedFinance) {
      updateFinance(financeId, data);
      handleCloseModalEdit();
    }
  };

  useEffect(() => {
    if (open && selectedFinance) {
      reset(selectedFinance);
    }
  }, [open, selectedFinance, reset]);

  return (
    <div>
      <Modal open={open} onClose={handleCloseModalEdit}>
        <Box sx={style}>
          <div className="Btn--Close">
            <IconButton
              aria-label="edit"
              size="medium"
              title="Fechar"
              onClick={handleCloseModalEdit}
              style={{ backgroundColor: "transparent" }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="InfoValues ModalEditFinance">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid className="FormGrid--Container ModalEditFinance" container>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <label htmlFor="description">Descrição</label>
                    <FieldTypeInput
                      placeholder="Digite aqui sua descrição"
                      defaultValue={selectedFinance?.description ?? ""}
                      {...register("description")}
                    />
                    <p className="errorMessage">
                      {errors.description?.message}
                    </p>
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item xs={6}>
                    <label htmlFor="value">Valor</label>
                    <div id="InfoValues__Field--Value">
                      <FieldTypeInput
                        type="text"
                        placeholder="1"
                        defaultValue={selectedFinance?.value ?? ""}
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
                    <select
                      {...register("typeValue")}
                      defaultValue={selectedFinance?.typeValue ?? ""}
                      id="typeValue"
                    >
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
              <button type="submit">Atualizar valor</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
