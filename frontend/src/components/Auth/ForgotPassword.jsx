import { Button, TextField, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../state/Authentication/Action";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await dispatch(forgotPassword(email));
      setMessage("Um e-mail de redefinição foi enviado.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="font-cormorant text-primary text-2xl">
        Digite o Email que deseja recuperar
      </h1>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        color="secondary"
        disabled={loading}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="secondary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
      </Button>
      {message && <h1>{message}</h1>}
    </section>
  );
};
