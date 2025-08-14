import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  ButtonGroup,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { fetchDashboardAnalytics } from "../../state/Dashboard/Action";
import {
  subDays,
  startOfMonth,
  startOfYear,
  endOfDay,
  formatISO,
} from "date-fns";
import { EmptyState } from "./EmptyState";
import { useNavigate } from "react-router-dom";

const StatsCard = ({ title, value, icon }) => (
  <Paper sx={{ p: 2, display: "flex", alignItems: "center", height: "100%" }}>
    {icon && <Box sx={{ mr: 2 }}>{icon}</Box>}
    <Box>
      <Typography color="text.secondary">{title}</Typography>
      <Typography variant="h5" component="p">
        {value}
      </Typography>
    </Box>
  </Paper>
);

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { analytics, loading } = useSelector((state) => state.dashboard);
  const [filter, setFilter] = useState("week");

  useEffect(() => {
    const now = new Date();
    let startDate;
    switch (filter) {
      case "month":
        startDate = startOfMonth(now);
        break;
      case "year":
        startDate = startOfYear(now);
        break;
      case "week":
      default:
        startDate = subDays(now, 7);
        break;
    }
    const endDate = endOfDay(now);

    dispatch(fetchDashboardAnalytics(formatISO(startDate), formatISO(endDate)));
  }, [dispatch, filter]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      );
    }

    // Se não há dados de análise (ex: primeira vez, nenhuma venda)
    if (
      !analytics ||
      (analytics.totalOrders === 0 && analytics.recentOrders.length === 0)
    ) {
      return (
        <EmptyState
          title="Bem-vindo à sua Dashboard!"
          message="Assim que começar a receber e a concluir pedidos, os seus dados de vendas aparecerão aqui. Boa sorte!"
          buttonText="Ver o seu Menu"
          onButtonClick={() => navigate("/admin/restaurants/menu")}
        />
      );
    }

    // Se há dados, renderiza os cartões e a tabela
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StatsCard
            title="Ganhos Totais"
            value={`R$ ${analytics.totalRevenue.toFixed(2)}`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsCard title="Pedidos Concluídos" value={analytics.totalOrders} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ mt: 3, mb: 2, fontFamily: "Cormorant Upright" }}
          >
            Vendas Recentes (
            {filter === "week"
              ? "Últimos 7 Dias"
              : filter === "month"
              ? "Este Mês"
              : "Este Ano"}
            )
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID do Pedido</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell align="right">Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {analytics.recentOrders.length > 0 ? (
                  analytics.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer.fullName}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        R$ {order.totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Mensagem para quando a tabela está vazia para um filtro específico
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="text.secondary">
                        Nenhuma venda concluída neste período.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Cormorant Upright", color: "secondary.main" }}
        >
          Dashboard
        </Typography>
        <ButtonGroup color="secondary">
          <Button
            variant={filter === "week" ? "contained" : "outlined"}
            onClick={() => setFilter("week")}
          >
            Últimos 7 Dias
          </Button>
          <Button
            variant={filter === "month" ? "contained" : "outlined"}
            onClick={() => setFilter("month")}
          >
            Este Mês
          </Button>
          <Button
            variant={filter === "year" ? "contained" : "outlined"}
            onClick={() => setFilter("year")}
          >
            Este Ano
          </Button>
        </ButtonGroup>
      </Box>

      {renderContent()}
    </Box>
  );
};
