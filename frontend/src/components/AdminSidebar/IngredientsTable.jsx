import { AppRegistration } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { CreateIngredientForm } from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantIngredients,
  updateIngredientStock,
} from "../../state/Ingredients/Action";
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

export const IngredientsTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { restaurant } = useSelector((store) => store.restaurant);
  const { ingredients } = useSelector((store) => store);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(getRestaurantIngredients(restaurant.id));
    }
  }, [restaurant, dispatch]);

  const handleUpdateStoking = (id) => {
    dispatch(updateIngredientStock(id));
  };

  return (
    <Box>
      <Card aria-label="tabela de ingredientes">
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
          title={"Ingredientes"}
          action={
            <IconButton onClick={handleOpen} aria-label="criar">
              <AppRegistration />
            </IconButton>
          }
        />

        {ingredients?.ingredients?.length > 0 ? (
          <TableContainer>
            <Table aria-label="tabela de ingredientes">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Categoria</TableCell>
                  <TableCell align="left">Disponibilidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.ingredients.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{item.id}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">{item.category.name}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleUpdateStoking(item.id)}
                        color={item.stoke ? "secondary" : "error"}
                      >
                        {item.stoke ? "em estoque" : "sem estoque"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 2 }}>
            <EmptyState
              title="Adicione os seus ingredientes"
              message="Para adicionar um ingrediente, você precisa primeiro de criar uma Categoria de Ingredientes (no painel ao lado). Depois, poderá adicionar ingredientes como 'Pão Brioche' à categoria 'Pães'."
              buttonText="Adicionar Ingrediente"
              onButtonClick={handleOpen}
            />
          </Box>
        )}
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};
