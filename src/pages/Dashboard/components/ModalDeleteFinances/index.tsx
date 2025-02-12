import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import { styleModalDeleteFinance } from "../../../../utils/styleModal";

interface ModalDeleteFinancesProps {
  open: boolean;
  handleCloseModalDelete: () => void;
  deleteAllFinances: () => void;
}

export const ModalDeleteFinances = ({
  open,
  handleCloseModalDelete,
  deleteAllFinances,
}: ModalDeleteFinancesProps) => {
  return (
    <div>
      <Modal open={open} onClose={handleCloseModalDelete}>
        <Box sx={styleModalDeleteFinance}>
          <div className="Btn--Close">
            <IconButton
              aria-label="edit"
              size="medium"
              title="Fechar"
              onClick={handleCloseModalDelete}
              style={{ backgroundColor: "transparent" }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="ModalDeleteFinances">
            <h1>Deseja apagar todos os itens da tabela?</h1>
            <div>
              <button type="button" onClick={handleCloseModalDelete}>
                NÃO
              </button>
              <button type="button" onClick={deleteAllFinances}>
                SIM
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
