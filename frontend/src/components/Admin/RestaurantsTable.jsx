import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRestaurantsAdmin,
  approveRestaurant,
  toggleRestaurantActiveStatus,
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
  Box,
} from "@mui/material";

export const RestaurantsTable = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(fetchAllRestaurantsAdmin());
  }, [dispatch]);

  const handleApproveRestaurant = (id) => {
    dispatch(approveRestaurant(id));
  };

  const handleToggleStatus = (id) => {
    dispatch(toggleRestaurantActiveStatus(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Dono</TableCell>
            <TableCell>Aprovação</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
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
                <Chip
                  label={restaurant.active ? "Ativo" : "Suspenso"}
                  color={restaurant.active ? "success" : "error"}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {!restaurant.approved && (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => handleApproveRestaurant(restaurant.id)}
                    >
                      Aprovar
                    </Button>
                  )}
                  {restaurant.approved && (
                    <Button
                      variant="outlined"
                      size="small"
                      color={restaurant.active ? "error" : "success"}
                      onClick={() => handleToggleStatus(restaurant.id)}
                    >
                      {restaurant.active ? "Suspender" : "Reativar"}
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
