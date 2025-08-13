import { Grid } from "@mui/material";
import { IngredientsTable } from "./IngredientsTable";
import { IngredientsCategoryTable } from "./IngredientsCategoryTable";

export const Ingredients = () => {
  return (
    <Grid container spacing={2} className="pt-4 px-2">
      <Grid item xs={12} lg={8}>
        <IngredientsTable />
      </Grid>
      <Grid item xs={12} lg={4}>
        <IngredientsCategoryTable />
      </Grid>
    </Grid>
  );
};
