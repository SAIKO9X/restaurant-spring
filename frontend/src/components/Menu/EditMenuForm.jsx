import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantIngredients } from "../../state/Ingredients/Action";
import { updateMenuItem } from "../../state/Menu/Action";
import { uploadImageToCloudinary } from "../../config/UploadToCloudinary";

export const EditMenuForm = ({ menuItemId, open, onClose }) => {
  const dispatch = useDispatch();
  const { restaurant, menu } = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);
  const menuItem = menu.menuItems.find(
    (item) => item.id === Number(menuItemId)
  );

  useEffect(() => {
    if (restaurant?.id && open) {
      dispatch(getRestaurantIngredients(restaurant.id));
    }
  }, [restaurant, dispatch, open]);

  const formik = useFormik({
    initialValues: {
      name: menuItem?.name || "",
      description: menuItem?.description || "",
      price: menuItem?.price || "",
      category: menuItem?.foodCategory?.id || "",
      restaurantId: restaurant?.id || "",
      isVegetarian: menuItem?.isVegetarian || false,
      seasonal: menuItem?.isSeasonal || false,
      available: menuItem?.available || false,
      ingredients: menuItem?.ingredients || [],
      images: menuItem?.images || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const categoryObject = restaurant.categories.find(
        (cat) => cat.id === values.category
      );
      const updatedValues = {
        ...values,
        category: categoryObject || null,
      };
      console.log("Valores enviados:", updatedValues);
      dispatch(
        updateMenuItem({ menuItemId, menuItemData: updatedValues })
      ).then(() => {
        onClose();
      });
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updatedImages);
  };

  if (!open) return null;

  return (
    <Box sx={{ p: 4 }}>
      <h1 className="font-bold 2xl:text-6xl lg:text-4xl text-2xl font-cormorant text-primary text-center pb-6">
        Editar Prato
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" item xs={12}>
            <input
              accept="image/*"
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-zinc-600">
                <AddPhotoAlternate className="text-white" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center">
                  <CircularProgress color="secondary" />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    className="w-24 h-24 object-cover"
                    src={image}
                    alt="Imagem do Prato"
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      outline: "none",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              color="secondary"
              label="Nome do Prato"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              color="secondary"
              label="Descrição"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              color="secondary"
              label="Preço"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="demo-simple-select-label">
                Categoria do Prato
              </InputLabel>
              <Select
                color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.category}
                label="Categoria"
                name="category"
                onChange={formik.handleChange}
              >
                {restaurant?.categories?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="label-ingredients">
                Ingredientes
              </InputLabel>
              <Select
                labelId="label-ingredients"
                id="select-ingredients"
                name="ingredients"
                color="secondary"
                variant="outlined"
                multiple
                value={formik.values.ingredients}
                onChange={formik.handleChange}
                input={<OutlinedInput id="multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value.id}
                        label={value.name}
                        color="secondary"
                      />
                    ))}
                  </Box>
                )}
              >
                {restaurant?.ingredients?.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="label-isVegetarian">
                Vegetariano
              </InputLabel>
              <Select
                color="secondary"
                labelId="label-isVegetarian"
                id="select-isVegetarian"
                value={formik.values.isVegetarian}
                label="Vegetariano"
                name="isVegetarian"
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="label-seasonal" color="secondary">
                Sazonal
              </InputLabel>
              <Select
                color="secondary"
                labelId="label-seasonal"
                id="select-seasonal"
                value={formik.values.seasonal}
                label="Sazonal"
                name="seasonal"
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Novo campo de disponibilidade */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel color="secondary" id="label-available">
                Disponível
              </InputLabel>
              <Select
                color="secondary"
                labelId="label-available"
                id="select-available"
                value={formik.values.available}
                label="Disponível"
                name="available"
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ mr: 2 }}
          >
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Atualizar Prato
          </Button>
        </Box>
      </form>
    </Box>
  );
};
