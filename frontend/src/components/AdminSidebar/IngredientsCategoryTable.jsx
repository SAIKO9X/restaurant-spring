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
import { CreateIngredientCategoryForm } from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategories } from "../../state/Ingredients/Action";

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

export const IngredientsCategoryTable = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { restaurant } = useSelector((store) => store.restaurant);
  const { ingredients } = useSelector((store) => store);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(getIngredientCategories(restaurant.id));
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
          title={"categoria dos ingredientes"}
          action={
            <IconButton onClick={handleOpen} aria-label="editar">
              <AppRegistration />
            </IconButton>
          }
        />

        <TableContainer>
          <Table aria-label="tabela de categoria dos ingredientes">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Nome</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.categories?.map((item) => (
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
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};
