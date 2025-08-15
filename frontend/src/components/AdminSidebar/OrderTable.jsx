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
import { EmptyState } from "../Admin/EmptyState";

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
  const { restaurantOrder } = useSelector((store) => store);

  // --- ESTADO MODIFICADO PARA GERIR O MENU ---
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    orderId: null,
  });

  useEffect(() => {
    dispatch(getRestaurantsOrder(filterValue));
  }, [dispatch, filterValue]);

  // --- HANDLERS MODIFICADOS ---
  const handleClick = (event, orderId) => {
    setMenuState({ anchorEl: event.currentTarget, orderId: orderId });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, orderId: null });
  };

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus(orderId, orderStatus));
    handleClose();
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

        {restaurantOrder?.adminOrders?.length > 0 ? (
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
                      <AvatarGroup max={3}>
                        {item.items?.map((orderItem) => (
                          <Avatar
                            key={orderItem.id}
                            src={orderItem.food?.images[0]}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {item.customer?.fullName}
                    </TableCell>
                    <TableCell align="right">{item.totalPrice} R$</TableCell>
                    <TableCell align="right">
                      {item.items?.map((orderItem) => (
                        <p key={orderItem.id}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {item.items?.map((orderItem) => (
                        <Box
                          key={orderItem.id}
                          sx={{
                            mb: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            justifyContent: "flex-end",
                          }}
                        >
                          {orderItem.ingredients?.map((ingredient, index) => (
                            <Chip
                              key={index}
                              label={ingredient}
                              color="secondary"
                              size="small"
                            />
                          ))}
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {statusMap[item.orderStatus]}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-haspopup="true"
                        // Passa o evento e o ID do pedido para o handler
                        onClick={(event) => handleClick(event, item.id)}
                        color="secondary"
                      >
                        atualizar
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        // O menu só abre para o pedido que foi clicado
                        anchorEl={
                          menuState.orderId === item.id
                            ? menuState.anchorEl
                            : null
                        }
                        open={Boolean(
                          menuState.anchorEl && menuState.orderId === item.id
                        )}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${item.id}`,
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
        ) : (
          <Box sx={{ p: 2 }}>
            <EmptyState
              title="Nenhum Pedido Recebido"
              message="Ainda não há pedidos para mostrar. Quando um cliente fizer um pedido, ele aparecerá aqui."
              buttonText="Ver Dashboard"
              onButtonClick={() => {}}
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};
