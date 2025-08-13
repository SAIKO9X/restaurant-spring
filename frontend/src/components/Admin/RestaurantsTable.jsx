import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurantsAdmin,
  approveRestaurant,
} from "../../state/Admin/Action";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";

export const RestaurantsTable = () => {
  const dispatch = useDispatch();
  const { restaurants, loading } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(fetchAllRestaurantsAdmin());
  }, [dispatch]);

  const handleApproveRestaurant = (id) => {
    dispatch(approveRestaurant(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Dono</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.id}</TableCell>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>{restaurant.owner?.fullName}</TableCell>
              <TableCell>
                <Chip
                  label={restaurant.approved ? "Aprovado" : "Pendente"}
                  color={restaurant.approved ? "success" : "warning"}
                />
              </TableCell>
              <TableCell>
                {!restaurant.approved && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleApproveRestaurant(restaurant.id)}
                  >
                    Aprovar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
