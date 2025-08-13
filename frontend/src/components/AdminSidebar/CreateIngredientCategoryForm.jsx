import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../state/Ingredients/Action";

export const CreateIngredientCategoryForm = () => {
  const { restaurant } = useSelector((store) => store.restaurant);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const ingredientCategoryRequest = {
      name: formData.name,
      restaurantId: restaurant?.id,
    };

    dispatch(createIngredientCategory(ingredientCategoryRequest));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-primary font-cormorant text-center font-bold text-2xl pb-10">
          Nova Categoria de Ingrediente
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            id="name"
            name="name"
            color="secondary"
            label="Categoria de Ingrediente"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          />

          <Button variant="contained" type="submit" color="secondary">
            Criar
          </Button>
        </form>
      </div>
    </div>
  );
};
