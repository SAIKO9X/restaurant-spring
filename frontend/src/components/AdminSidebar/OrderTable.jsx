import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getRestaurantsOrder,
  updateOrderStatus,
} from "../../state/AdminOrder/Action";

const orderStatus = [
  { label: "Pendente", value: "PENDING" },
  { label: "Cancelado", value: "CANCELLED" },
  { label: "Saiu Para Entrega", value: "OUT_FOR_DELIVERY" },
  { label: "Entregue", value: "DELIVERED" },
];

const statusMap = {
  PENDING: "PENDENTE",
  CANCELLED: "CANCELADO",
  OUT_FOR_DELIVERY: "SAIU PARA ENTREGA",
  DELIVERED: "ENTREGUE",
};

export const OrderTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const { restaurantOrder, restaurant } = useSelector((store) => store);
  const restaurantId = restaurant?.restaurant?.id; // Ajuste conforme seu estado

  useEffect(() => {
    if (restaurantId) {
      dispatch(getRestaurantsOrder(restaurantId, filterValue));
    }
  }, [dispatch, restaurantId, filterValue]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus(orderId, orderStatus));
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          title={"Pedidos Feitos"}
        />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de pedidos">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Imagem</TableCell>
                <TableCell align="right">Cliente</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Ingredientes</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Modificar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder?.adminOrders?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items?.map((orderItem) => (
                        <Avatar
                          key={orderItem.id}
                          src={orderItem.food?.images[0]}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.fullName}</TableCell>
                  <TableCell align="right">{item.totalPrice + "R$"}</TableCell>
                  <TableCell align="right">
                    {item.items?.map((orderItem) => (
                      <p key={orderItem.id}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items?.map((orderItem) => (
                      <div key={orderItem.id}>
                        {orderItem.ingredients?.map((ingredient) => (
                          <Chip
                            key={ingredient.id}
                            label={ingredient}
                            color="secondary"
                          />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {statusMap[item.orderStatus]}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      color="secondary"
                    >
                      atualizar
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() =>
                            handleUpdateOrder(item.id, status.value)
                          }
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
