// frontend/src/components/AdminSidebar/CategoryTable.jsx

import { AppRegistration } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CreateFoodCategoryForm } from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantCategories } from "../../state/Restaurant/Action";
import { EmptyState } from "../Admin/EmptyState";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(getRestaurantCategories(restaurant.id));
    }
  }, [dispatch, restaurant]);

  return (
    <Box>
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
          title={"Categorias de Comida"}
          action={
            <IconButton onClick={handleOpen} aria-label="criar categoria">
              <AppRegistration />
            </IconButton>
          }
        />

        {restaurant?.categories?.length > 0 ? (
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="tabela de categorias de comida"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Nome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurant.categories.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{item.id}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 2 }}>
            <EmptyState
              title="Crie a sua primeira categoria"
              message="Categorias ajudam a organizar o seu menu. Por exemplo: 'Hambúrgueres', 'Bebidas', 'Sobremesas'."
              buttonText="Criar Categoria"
              onButtonClick={handleOpen}
            />
          </Box>
        )}
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};
