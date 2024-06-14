import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";

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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 450,
    width: "95%",
    height: "12.5rem",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "0.5rem",
  };

  return (
    <div>
      <Modal open={open} onClose={handleCloseModalDelete}>
        <Box sx={style}>
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
