import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { uploadImageToCloudinary } from "../../config/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../state/Restaurant/Action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  stateProvince: "",
  postalCode: "",
  city: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  facebook: "",
  openingHours: "Seg-Dom: 12:00 - 23:00",
  images: [],
};

export const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);

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

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        city: values.city,
        country: values.country,
      },
      contact: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
        facebook: values.facebook,
      },
      openingHours: values.openingHours,
      images: values.images,
    };

    console.log("data:", data);
    dispatch(createRestaurant(data, navigate)).then((response) => {
      console.log("Resposta da criação do restaurante:", response);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <section className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold 2xl:text-6xl lg:text-4xl text-2xl font-cormorant text-primary text-center pb-6">
          Criar Novo Restaurante
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
                <span className="w-24  h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-zinc-600">
                  <AddPhotoAlternate className="text-white" />
                </span>

                <span>
                  {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center">
                      <CircularProgress color="secondary" />
                    </div>
                  )}
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt="Foto do Restaurante"
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
                label="Nome"
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
                id="cuisineType"
                name="cuisineType"
                color="secondary"
                label="Tipo de Cozinha"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                color="secondary"
                label="Horário de Funcionamento"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                color="secondary"
                label="Endereço"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="stateProvince"
                name="stateProvince"
                color="secondary"
                label="Estado/Província"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                color="secondary"
                label="Código Postal"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                color="secondary"
                label="Cidade"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                color="secondary"
                label="País"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                color="secondary"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                color="secondary"
                label="Celular"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                color="secondary"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                color="secondary"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="facebook"
                name="facebook"
                color="secondary"
                label="Facebook"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.facebook}
              />
            </Grid>
          </Grid>

          <Button variant="contained" color="secondary" type="submit">
            adicionar restaurante
          </Button>
        </form>
      </div>
    </section>
  );
};
