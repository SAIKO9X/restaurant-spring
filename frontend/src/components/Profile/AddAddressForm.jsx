import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Box } from "@mui/material";
import { Cancel as CancelIcon, Add } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAddress } from "../../state/Address/Action";

export const AddAddressForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    streetAddress: Yup.string().required("Endereço é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    stateProvince: Yup.string().required("Estado é obrigatório"),
    postalCode: Yup.string()
      .required("CEP é obrigatório")
      .matches(/^\d{5}-\d{3}$/, "Formato inválido. Use: 00000-000"),
    country: Yup.string().required("País é obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addAddress(values));
      onClose();
    },
  });

  const handleCepChange = (e) => {
    const { value } = e.target;
    const cepValue = value.replace(/\D/g, "");

    if (cepValue.length <= 8) {
      const formattedCep =
        cepValue.length > 5
          ? `${cepValue.slice(0, 5)}-${cepValue.slice(5)}`
          : cepValue;

      formik.setFieldValue("postalCode", formattedCep);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ p: 2, backgroundColor: "primary.main" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="streetAddress"
            name="streetAddress"
            label="Endereço"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.streetAddress &&
              Boolean(formik.errors.streetAddress)
            }
            helperText={
              formik.touched.streetAddress && formik.errors.streetAddress
            }
            size="small"
            placeholder="Rua, número, complemento"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="Cidade"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="stateProvince"
            name="stateProvince"
            label="Estado"
            value={formik.values.stateProvince}
            onChange={formik.handleChange}
            error={
              formik.touched.stateProvince &&
              Boolean(formik.errors.stateProvince)
            }
            helperText={
              formik.touched.stateProvince && formik.errors.stateProvince
            }
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="postalCode"
            name="postalCode"
            label="CEP"
            value={formik.values.postalCode}
            onChange={(e) => handleCepChange(e)}
            error={
              formik.touched.postalCode && Boolean(formik.errors.postalCode)
            }
            helperText={formik.touched.postalCode && formik.errors.postalCode}
            size="small"
            placeholder="00000-000"
            inputProps={{ maxLength: 9 }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            id="country"
            name="country"
            label="País"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            size="small"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            startIcon={<CancelIcon />}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            startIcon={<Add />}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
