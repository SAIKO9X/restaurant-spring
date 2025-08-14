import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { uploadImageToCloudinary } from "../../config/UploadToCloudinary";
import { updateRestaurant } from "../../state/Restaurant/Action";
import { useState } from "react";

export const EditRestaurantForm = ({ restaurant, onClose }) => {
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: restaurant?.name || "",
      cuisineType: restaurant?.cuisineType || "",
      openingHours: restaurant?.openingHours || "",
      description: restaurant?.description || "",
      address: {
        streetAddress: restaurant?.address?.streetAddress || "",
        city: restaurant?.address?.city || "",
        country: restaurant?.address?.country || "",
        postalCode: restaurant?.address?.postalCode || "",
      },
      contact: {
        email: restaurant?.contact?.email || "",
        mobile: restaurant?.contact?.mobile || "",
        instagram: restaurant?.contact?.instagram || "",
        twitter: restaurant?.contact?.twitter || "",
        facebook: restaurant?.contact?.facebook || "",
      },
      images: restaurant?.images || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateRestaurant(restaurant.id, values)).then(() => {
        onClose();
      });
    },
  });

  // Função para lidar com a adição de uma nova imagem
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  // Função para lidar com a remoção de uma imagem
  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <Box sx={{ p: 4 }}>
      <h1 className="font-bold 2xl:text-6xl lg:text-4xl text-2xl font-cormorant text-primary text-center pb-6">
        Editar Restaurante
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          {/* --- SECÇÃO DE GESTÃO DE IMAGENS --- */}
          <Grid item xs={12}>
            <div className="flex flex-wrap items-center gap-5">
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
                      className="w-24 h-24 object-cover rounded"
                      src={image}
                      alt="Foto do Restaurante"
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.8)",
                        },
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close sx={{ fontSize: "1rem", color: "white" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          {/* --- FORMULÁRIO --- */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nome do Restaurante"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Descrição"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="cuisineType"
              name="cuisineType"
              label="Tipo de Culinária"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.cuisineType}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="openingHours"
              name="openingHours"
              label="Horário de Funcionamento"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.openingHours}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address.streetAddress"
              name="address.streetAddress"
              label="Endereço"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.address.streetAddress}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="address.city"
              name="address.city"
              label="Cidade"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.address.city}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="address.country"
              name="address.country"
              label="País"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.address.country}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              id="address.postalCode"
              name="address.postalCode"
              label="CEP"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.address.postalCode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="contact.email"
              name="contact.email"
              label="Email"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.contact.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="contact.mobile"
              name="contact.mobile"
              label="Telefone"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.contact.mobile}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="contact.instagram"
              name="contact.instagram"
              label="Instagram"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.contact.instagram}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="contact.twitter"
              name="contact.twitter"
              label="Twitter"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.contact.twitter}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="contact.facebook"
              name="contact.facebook"
              label="Facebook"
              variant="outlined"
              color="secondary"
              onChange={formik.handleChange}
              value={formik.values.contact.facebook}
            />
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
            Atualizar Restaurante
          </Button>
        </Box>
      </form>
    </Box>
  );
};
