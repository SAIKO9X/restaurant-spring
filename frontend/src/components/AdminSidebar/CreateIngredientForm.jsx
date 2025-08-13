import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientItem } from "../../state/Ingredients/Action";

export const CreateIngredientForm = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);
  const { ingredients } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientRequest = {
      ...formData,
      restaurantId: restaurant?.id,
    };

    dispatch(createIngredientItem(ingredientRequest));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="p-5">
      <h1 className="text-primary font-cormorant text-center font-bold text-2xl pb-10">
        Adicionar Ingrediente
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          id="name"
          name="name"
          color="secondary"
          label="Nome do Ingrediente"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />

        <FormControl fullWidth>
          <InputLabel color="secondary" id="label-ingredient-category">
            Tipo de Ingrediente
          </InputLabel>
          <Select
            color="secondary"
            labelId="label-ingredient-category"
            id="select-ingredient-category"
            value={formData.ingredientCategoryId}
            label="Categoria"
            name="categoryId"
            onChange={handleInputChange}
          >
            {ingredients?.categories?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit" color="secondary">
          Criar
        </Button>
      </form>
    </div>
  );
};
