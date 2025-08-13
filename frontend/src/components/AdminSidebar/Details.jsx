import { Facebook, Instagram, X, Edit as EditIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../state/Restaurant/Action";
import { useState } from "react";
import { EditRestaurantForm } from "../Restaurant/EditRestaurantForm";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export const Details = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);
  const [openModal, setOpenModal] = useState(false);

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus(restaurant.id));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-4xl 2xl:text-6xl text-center font-bold p-5 font-cormorant text-primary">
          {restaurant?.name}
        </h1>

        <Button
          color={restaurant?.open ? "error" : "success"}
          variant="contained"
          className="py-4 px-8"
          onClick={handleRestaurantStatus}
          size="medium"
        >
          {!restaurant?.open ? "abrir" : "fechar"}
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <div className="flex items-center justify-between pr-4">
              <CardHeader
                title={
                  <span className="text-zinc-300 capitalize font-bold font-cormorant text-2xl">
                    informações do restaurante
                  </span>
                }
              />

              <Button
                color="secondary"
                variant="outlined"
                onClick={handleOpenModal}
                size="medium"
                sx={{ ml: 2 }}
                startIcon={<EditIcon />}
              >
                Editar
              </Button>
            </div>
            <CardContent>
              <div className="space-y-4 text-zinc-200 capitalize">
                <div className="flex">
                  <p className="w-60">proprietário</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.owner.fullName}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">nome do restaurante</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.name}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">tipo de culinária</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">funcionamento</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.openingHours}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">status do restaurante</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.open ? (
                      <span className="px-5 py-2 rounded-full font-cormorant font-bold text-lg text-black bg-green-500">
                        aberto
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full font-cormorant font-bold text-lg text-white bg-red-500">
                        fechado
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={
                <span className="text-zinc-300 capitalize font-bold font-cormorant text-2xl">
                  endereço
                </span>
              }
            />
            <CardContent>
              <div className="space-y-4 text-zinc-200 capitalize">
                <div className="flex">
                  <p className="w-60">país</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.address?.country}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">cidade</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.address?.city}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">cep</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.address?.postalCode}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">endereço</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.address?.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={
                <span className="text-zinc-300 capitalize font-bold font-cormorant text-2xl">
                  contatos
                </span>
              }
            />
            <CardContent>
              <div className="space-y-4 text-zinc-200">
                <div className="flex">
                  <p className="w-60 capitalize">email</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.contact?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-60 capitalize">telefone</p>
                  <p className="text-zinc-400">
                    <span className="pr-5">-</span>
                    {restaurant?.contact?.mobile}
                  </p>
                </div>
                <div className="flex capitalize">
                  <p className="w-60">redes sociais</p>
                  <p className="text-zinc-400">
                    <div className="flex">
                      <span className="pr-5">-</span>
                      <div className="flex gap-2">
                        <a href={restaurant?.contact?.instagram}>
                          <Instagram />
                        </a>
                        <a href={restaurant?.contact?.twitter}>
                          <X />
                        </a>
                        <a href={restaurant?.contact?.facebook}>
                          <Facebook />
                        </a>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <EditRestaurantForm
            restaurant={restaurant}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </div>
  );
};
