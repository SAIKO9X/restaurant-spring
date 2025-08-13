import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateRestaurant } from "../../state/Restaurant/Action";

export const EditRestaurantForm = ({ restaurant, onClose }) => {
  const dispatch = useDispatch();

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

  return (
    <Box sx={{ p: 4 }}>
      <h1 className="font-bold 2xl:text-6xl lg:text-4xl text-2xl font-cormorant text-primary text-center pb-6">
        Editar Restaurante
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Grid container spacing={2}>
          {/* Informações do restaurante */}
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

          {/* Endereço */}
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

          {/* Contatos */}
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
