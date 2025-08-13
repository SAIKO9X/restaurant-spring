import { Grid } from "@mui/material";
import { MenuTable } from "../AdminSidebar/MenuTable";
import { OrderTable } from "../AdminSidebar/OrderTable";

export const Dashboard = () => {
  return (
    <div>
      <Grid container spacing={2} className="p-2">
        <Grid item xs={12} lg={6}>
          <MenuTable />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrderTable />
        </Grid>
      </Grid>
    </div>
  );
};
