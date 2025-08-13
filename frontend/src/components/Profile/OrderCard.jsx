import { Button, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../state/Order/Action";

export const OrderCard = ({ item, order }) => {
  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    dispatch(cancelOrder(order.id));
  };

  return (
    <Card className="flex justify-between items-center p-2">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16 rounded"
          src={item.food.images[0]}
          alt="Imagem de Comida"
        />
        <div>
          <p className="text-primary font-semibold">{item.food.name}</p>
          <p className="text-zinc-500">{item.totalPrice} R$</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outlined"
          color="secondary"
          sx={{ fontWeight: "bold" }}
          className="cursor-not-allowed"
        >
          {order.orderStatus}
        </Button>
        {order.orderStatus === "PENDING" && (
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelOrder}
            sx={{ fontWeight: "bold" }}
          >
            Cancelar
          </Button>
        )}
      </div>
    </Card>
  );
};
