import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { register } from "../../state/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    dispatch(register({ userData: values, navigate }));
  };

  return (
    <>
      <h1 className="text-center font-cormorant capitalize text-2xl font-bold text-primary">
        criar conta
      </h1>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            color="secondary"
            label="Nome Completo"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="email"
            type="email"
            color="secondary"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="password"
            type="password"
            color="secondary"
            label="Senha"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <FormControl fullWidth sx={{ marginTop: "1rem" }}>
            <InputLabel
              id="role-select-label"
              sx={{
                color: "#dcca87",
                "&.Mui-focused": {
                  color: "#dcca87",
                },
              }}
            >
              Tipo de Conta
            </InputLabel>
            <Field
              as={Select}
              labelId="role-select-label"
              id="role-select"
              name="role"
              color="secondary"
              sx={{
                color: "#dcca87",
                ".MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#dcca87",
                  },
                  "&:hover fieldset": {
                    borderColor: "#dcca87",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#dcca87",
                  },
                },
                ".MuiSelect-icon": {
                  color: "#dcca87",
                },
              }}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Cliente</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurante</MenuItem>
            </Field>
          </FormControl>

          <Button
            sx={{ marginTop: "2rem", padding: "0.8rem", fontWeight: "bold" }}
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
          >
            cadastrar
          </Button>
        </Form>
      </Formik>

      <div className="mt-2 flex items-center justify-center gap-1">
        <p className="text-sm text-zinc-400 mb-1">Já tenho um conta</p>
        <Button onClick={() => navigate("/account/login")} color="secondary">
          entrar
        </Button>
      </div>
    </>
  );
};
