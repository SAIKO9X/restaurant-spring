import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/Authentication/Action";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center">
        <AccountCircle color="secondary" sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 lg:text-4xl text-2xl font-semibold font-cormorant">
          {auth.user?.fullName || "Usuário"}
        </h1>
        <p className="text-zinc-300">
          email: {auth.user?.email || "email@example.com"}
        </p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{ margin: "2rem 0rem", fontWeight: "bold" }}
        >
          Sair da Conta
        </Button>
      </div>
    </section>
  );
};
