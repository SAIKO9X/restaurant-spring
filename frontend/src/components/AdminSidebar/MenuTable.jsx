import { AppRegistration, Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteMenuItem,
  getMenuItemsByRestaurantId,
} from "../../state/Menu/Action";
import { useEffect, useState } from "react";
import { EditMenuForm } from "../Menu/EditMenuForm";

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

export const MenuTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurant } = useSelector((store) => store.restaurant);
  const { menu } = useSelector((store) => store);

  const [filters] = useState({
    vegetarian: false,
    noVegetarian: false,
    seasonal: false,
    food_category: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(getMenuItemsByRestaurantId(restaurant?.id, filters));
    }
  }, [dispatch, restaurant, filters]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteMenuItem(foodId));
  };

  const handleOpenModal = (itemId) => {
    setSelectedMenuItemId(itemId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMenuItemId(null);
    dispatch(getMenuItemsByRestaurantId(restaurant?.id, filters)); // Atualiza a lista ao fechar
  };

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          sx: {
            textTransform: "capitalize",
            fontFamily: "Cormorant Upright, serif",
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "secondary.main",
          },
        }}
        title={"Items do Menu"}
        action={
          <IconButton
            onClick={() => navigate("/admin/restaurants/add_menu")}
            aria-label="adicionar"
          >
            <AppRegistration />
          </IconButton>
        }
      />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Imagem</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Preço</TableCell>
              <TableCell align="left">Ingredientes</TableCell>
              <TableCell align="left">Disponibilidade</TableCell>
              <TableCell align="left">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu?.menuItems?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Avatar src={item.images[0]} />
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.price + " R$"}</TableCell>
                <TableCell align="left">
                  {item.ingredients.map((ingredient) => (
                    <Chip
                      key={ingredient.id}
                      label={ingredient.name}
                      size="small"
                      color="secondary"
                    />
                  ))}
                </TableCell>
                <TableCell align="left">
                  {item.available ? "disponível" : "indisponível"}
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => handleOpenModal(item.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteFood(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <EditMenuForm
            menuItemId={selectedMenuItemId}
            open={openModal}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </Card>
  );
};
