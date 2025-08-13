import { RestaurantsTable } from "./RestaurantsTable";
import { Typography } from "@mui/material";

export const AdminDashboard = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Painel do Administrador
      </Typography>
      <RestaurantsTable />
    </div>
  );
};
