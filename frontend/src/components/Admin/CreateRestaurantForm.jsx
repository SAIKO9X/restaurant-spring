import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { uploadImageToCloudinary } from "../../config/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../state/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputMask from "react-input-mask";

const validationSchema = Yup.object({
  name: Yup.string().required("O nome do restaurante é obrigatório."),
  description: Yup.string()
    .required("A descrição é obrigatória.")
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  cuisineType: Yup.string().required("O tipo de cozinha é obrigatório."),
  streetAddress: Yup.string().required("O endereço é obrigatório."),
  stateProvince: Yup.string().required("O estado é obrigatório."),
  // Valida o formato 99999-999
  postalCode: Yup.string()
    .matches(/^\d{5}-\d{3}$/, "O formato do CEP é inválido.")
    .required("O código postal é obrigatório."),
  city: Yup.string().required("A cidade é obrigatória."),
  country: Yup.string().required("O país é obrigatório."),
  email: Yup.string()
    .email("O formato do email é inválido.")
    .required("O email de contato é obrigatório."),
  // Valida o formato (99) 99999-9999
  mobile: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "O formato do celular é inválido.")
    .required("O número de celular é obrigatório."),
  openingHours: Yup.string().required(
    "O horário de funcionamento é obrigatório."
  ),
  images: Yup.array()
    .min(1, "É necessário pelo menos uma imagem.")
    .required("As imagens são obrigatórias."),
  twitter: Yup.string().url("Por favor, insira uma URL válida."),
  instagram: Yup.string().url("Por favor, insira uma URL válida."),
  facebook: Yup.string().url("Por favor, insira uma URL válida."),
});

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

    dispatch(createRestaurant(data, navigate));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
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
            {/* --- Campo de Imagens com Validação e Ajuda --- */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1, color: "secondary.main" }}>
                Imagens do Restaurante *
              </Typography>
              <div className="flex flex-wrap gap-5">
                <input
                  accept="image/*"
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  disabled={uploadImage}
                />
                <label className="relative" htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-zinc-600">
                    <AddPhotoAlternate className="text-white" />
                  </span>
                  {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                      <CircularProgress color="secondary" />
                    </div>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {formik.values.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        className="w-24 h-24 object-cover rounded-md"
                        src={image}
                        alt="Foto do Restaurante"
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(0,0,0,0.6)",
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
              <Typography
                color={
                  formik.touched.images && formik.errors.images
                    ? "error"
                    : "text.secondary"
                }
                variant="caption"
                sx={{ display: "block", mt: 1 }}
              >
                {formik.touched.images && formik.errors.images
                  ? formik.errors.images
                  : "Adicione uma ou mais fotos do seu espaço. A primeira imagem será a capa."}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                color="secondary"
                label="Nome do Restaurante"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
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
                multiline
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.description}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : "Fale sobre a história, o ambiente e os pratos principais do seu restaurante."
                }
                required
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
                error={
                  formik.touched.cuisineType &&
                  Boolean(formik.errors.cuisineType)
                }
                helperText={
                  formik.touched.cuisineType && formik.errors.cuisineType
                    ? formik.errors.cuisineType
                    : "Ex: Italiana, Brasileira, Japonesa, Fast Food"
                }
                required
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
                error={
                  formik.touched.openingHours &&
                  Boolean(formik.errors.openingHours)
                }
                helperText={
                  formik.touched.openingHours && formik.errors.openingHours
                    ? formik.errors.openingHours
                    : "Ex: Seg-Sex: 11:00 - 22:00, Sáb-Dom: 11:00 - 23:00"
                }
                required
              />
            </Grid>

            {/* --- SEÇÃO DE ENDEREÇO --- */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ mt: 2, mb: 1, color: "secondary.main" }}
              >
                Endereço
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="streetAddress"
                label="Rua e Número"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
                error={
                  formik.touched.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.touched.streetAddress && formik.errors.streetAddress
                }
                required
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="city"
                label="Cidade"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                required
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="stateProvince"
                label="Estado"
                onChange={formik.handleChange}
                value={formik.values.stateProvince}
                error={
                  formik.touched.stateProvince &&
                  Boolean(formik.errors.stateProvince)
                }
                helperText={
                  formik.touched.stateProvince && formik.errors.stateProvince
                }
                required
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputMask
                mask="99999-999"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    required
                    name="postalCode"
                    label="Código Postal"
                    error={
                      formik.touched.postalCode &&
                      Boolean(formik.errors.postalCode)
                    }
                    helperText={
                      formik.touched.postalCode && formik.errors.postalCode
                    }
                    color="secondary"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="country"
                label="País"
                onChange={formik.handleChange}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                required
                color="secondary"
              />
            </Grid>

            {/* --- SEÇÃO DE CONTATO --- */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ mt: 2, mb: 1, color: "secondary.main" }}
              >
                Contato e Redes Sociais
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label="Email de Contato"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputMask
                mask="(99) 99999-9999"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    required
                    name="mobile"
                    label="Celular de Contato"
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    color="secondary"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="twitter"
                label="Twitter"
                onChange={formik.handleChange}
                value={formik.values.twitter}
                error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                helperText={
                  formik.touched.twitter && formik.errors.twitter
                    ? formik.errors.twitter
                    : "Opcional. Insira a URL completa."
                }
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="instagram"
                label="Instagram"
                onChange={formik.handleChange}
                value={formik.values.instagram}
                error={
                  formik.touched.instagram && Boolean(formik.errors.instagram)
                }
                helperText={
                  formik.touched.instagram && formik.errors.instagram
                    ? formik.errors.instagram
                    : "Opcional. Insira a URL completa."
                }
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                name="facebook"
                label="Facebook"
                onChange={formik.handleChange}
                value={formik.values.facebook}
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
                helperText={
                  formik.touched.facebook && formik.errors.facebook
                    ? formik.errors.facebook
                    : "Opcional. Insira a URL completa."
                }
                color="secondary"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ mt: 2, py: 1.5 }}
            fullWidth
          >
            Criar Restaurante
          </Button>
        </form>
      </div>
    </section>
  );
};
