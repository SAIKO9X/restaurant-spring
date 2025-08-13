import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TaskAlt } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../state/Cart/Action";

export const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <section className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="w-full flex flex-col items-center rounded-md p-5">
          <TaskAlt
            sx={{ fontSize: "5rem", color: green[500] }}
            className="animated-icon"
          />
          <h1 className="py-5 text-2xl font-semibold font-cormorant text-green-500">
            Pedido Realizado
          </h1>
          <p>Obrigado por escolher nosso restaurante, apreciamos seu pedido</p>
          <p className="pt-2 pb-6 text-zinc-300">Tenha um Bom Dia !</p>
          <Button onClick={() => navigate("/")} variant="contained">
            Voltar
          </Button>
        </div>
      </div>
    </section>
  );
};
