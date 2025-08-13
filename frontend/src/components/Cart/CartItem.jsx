import { Chip, IconButton } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../state/Cart/Action";
import { useState } from "react";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id }));
  };

  const handleUpdateCartItem = (value) => {
    const newQuantity = quantity + value;

    if (newQuantity < 1) {
      handleRemoveCartItem();
    } else {
      setQuantity(newQuantity);

      const data = { cartItemId: item.id, quantity: newQuantity };
      dispatch(updateCartItem(data));
    }
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div className="mb-4 lg:mb-0">
          <img
            className="w-20 h-20 object-cover rounded"
            src={item.food.images[0]}
            alt="Imagem da Comida"
          />
        </div>

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p className="font-semibold text-zinc-300 font-cormorant capitalize text-xl">
              {item.food.name}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 -ml-2">
                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                  <RemoveCircleOutline color="secondary" fontSize="small" />
                </IconButton>
                <p className="w-5 h-5 text-xs font-semibold flex items-center justify-center">
                  {item.quantity}
                </p>
                <IconButton onClick={() => handleUpdateCartItem(1)}>
                  <AddCircleOutline color="secondary" fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>

          <p className="w-full text-zinc-400 text-right">
            {item.totalPrice} R$
          </p>
        </div>
      </div>

      <div className="pt-3 space-x-2">
        {item.ingredient.map((ingredient, index) => (
          <Chip
            style={{ fontWeight: "bold" }}
            color="secondary"
            size="small"
            key={index}
            label={ingredient}
          />
        ))}
      </div>
    </div>
  );
};
