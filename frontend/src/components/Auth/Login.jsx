import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../state/Authentication/Action";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values) => {
    try {
      await dispatch(login({ userData: values, navigate }));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center font-cormorant capitalize text-2xl font-bold text-primary">
        Faça login
      </h1>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
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

          {errorMessage && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            sx={{ marginTop: "2rem", padding: "0.8rem", fontWeight: "bold" }}
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
          >
            Entrar
          </Button>
        </Form>
      </Formik>

      <div className="mt-2 flex items-center justify-center gap-1">
        <p className="text-sm text-zinc-400 mb-1">Não tem uma conta?</p>
        <Button onClick={() => navigate("/account/register")} color="secondary">
          Criar conta
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1">
        <Button onClick={() => navigate("/forgot-password")} color="secondary">
          Recuperar Senha
        </Button>
      </div>
    </>
  );
};
