import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../state/Restaurant/Action";

export const CreateFoodCategoryForm = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);

  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.categoryName,
      restaurantId: restaurant?.id,
    };

    if (!data.restaurantId) {
      console.error("Restaurant ID is undefined");
      return;
    }

    dispatch(createCategory(data, data.restaurantId));

    console.log("Category Data", data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-primary font-cormorant text-center font-bold text-2xl pb-10">
          Nova Categoria de Comida
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            color="secondary"
            label="Tipo de Comida"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          />

          <Button variant="contained" type="submit" color="secondary">
            Criar
          </Button>
        </form>
      </div>
    </div>
  );
};
