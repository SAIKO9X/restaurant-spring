import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  AddLocationAlt,
} from "@mui/icons-material";
import { getUserAddresses } from "../../state/Address/Action";
import { AddAddressForm } from "./AddAddressForm";

export const Address = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((store) => store);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="mt-20 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-cormorant text-primary text-3xl">Meus Endereços</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenModal}
          startIcon={<AddLocationAlt />}
        >
          Novo Endereço
        </Button>
      </div>

      <div className="py-4">
        <Grid container spacing={2}>
          {address.addresses.length > 0 ? (
            address.addresses.map((addr) => (
              <Grid item xs={12} key={addr.id}>
                <Paper
                  elevation={1}
                  className="border border-primary p-4 bg-white/10 text-zinc-100"
                >
                  <div className="flex justify-between items-center">
                    <p>
                      {addr.streetAddress}, {addr.city}, {addr.stateProvince},{" "}
                      {addr.postalCode}, {addr.country}
                    </p>
                    <IconButton size="small" color="secondary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <div className="text-center py-8 text-zinc-100">
                <p>Você ainda não possui endereços cadastrados.</p>
              </div>
            </Grid>
          )}
        </Grid>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: "black",
            backgroundImage: "linear-gradient(rgba(0, 0, 0), rgba(0, 0, 0)",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Adicionar Endereço
          <IconButton
            size="small"
            onClick={handleCloseModal}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddAddressForm onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </section>
  );
};
