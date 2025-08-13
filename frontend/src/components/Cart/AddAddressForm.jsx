import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import { Box, Button, Grid, TextField } from "@mui/material";
import { addAddress } from "../../state/Address/Action";
import { style } from "../../pages/Cart";

const initialValues = {
  streetAddress: "",
  stateProvince: "",
  postalCode: "",
  city: "",
};

export const AddAddressForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const addressData = { ...values, country: "Brasil" };
    dispatch(addAddress(addressData)).then(() => onClose());
  };

  return (
    <div>
      <Box sx={style}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="streetAddress"
                  label="Endereço de Rua"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="stateProvince"
                  label="Estado"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="postalCode"
                  label="CEP"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="city"
                  label="Cidade"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Adicionar Endereço
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </div>
  );
};
