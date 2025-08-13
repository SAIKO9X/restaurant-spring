import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../state/Authentication/Action";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await dispatch(resetPassword(token, newPassword));
      setMessage("Senha redefinida com sucesso.");
      setTimeout(() => navigate("/account/login"), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1 className="font-cormorant text-primary text-2xl">
        Digite Sua Nova Senha
      </h1>
      <TextField
        label="Nova Senha"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        color="secondary"
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="secondary">
        Redefinir
      </Button>
      {message && <Typography sx={{ mt: 1 }}>{message}</Typography>}
    </section>
  );
};
