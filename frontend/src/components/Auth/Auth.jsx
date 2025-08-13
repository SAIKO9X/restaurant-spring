import { Box, IconButton, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "500px" },
  bgcolor: "background.paper",
  border: "2px solid #dcca87",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <Modal
      onClose={handleClose}
      open={
        location.pathname === "/account/register" ||
        location.pathname === "/account/login" ||
        location.pathname === "/forgot-password" ||
        location.pathname.startsWith("/reset-password")
      }
      disableEscapeKeyDown
      BackdropProps={{
        onClick: (e) => e.stopPropagation(),
      }}
    >
      <Box sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        {location.pathname === "/account/register" ? (
          <Register />
        ) : location.pathname === "/forgot-password" ? (
          <ForgotPassword />
        ) : location.pathname.startsWith("/reset-password") ? (
          <ResetPassword />
        ) : (
          <Login />
        )}
      </Box>
    </Modal>
  );
};
