import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Divider, Modal } from "@mui/material";
import { CartItem } from "../components/Cart/CartItem";
import { AddressCard } from "../components/Cart/AddressCard";
import { AddLocationAltOutlined } from "@mui/icons-material";
import { AddAddressForm } from "../components/Cart/AddAddressForm";
import { getUserAddresses } from "../state/Address/Action";
import { createOrder } from "../state/Order/Action";
import { findCart } from "../state/Cart/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const Cart = () => {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { cart, address } = useSelector((store) => store);
  const dispatch = useDispatch();

  // Busca os endereços e o carrinho ao carregar o componente
  useEffect(() => {
    dispatch(getUserAddresses());
    dispatch(findCart()); // Garante que o carrinho esteja atualizado
  }, [dispatch]);

  // Recalcula o total sempre que cart.cartItems mudar
  const calculateTotal = () => {
    return cart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const totalWithFees = calculateTotal() + 10 + 5; // Frete (10) + Taxa (5)

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleFinalizeOrder = () => {
    if (!selectedAddress) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }
    const orderRequest = {
      restaurantId: cart.cartItems[0]?.food?.restaurant?.id,
      deliveryAddress: selectedAddress,
    };
    dispatch(createOrder(orderRequest));
  };

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className="lg:flex justify-between">
        <div className="lg:w-[30%] space-y-6 lg:min-h-screen pt-20">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Divider />

          <div className="px-5 text-sm">
            <p className="text-xl py-5 capitalize font-cormorant">
              detalhes do pedido
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-zinc-400">
                <p className="capitalize">valor do pedido</p>
                <p>{calculateTotal().toFixed(2)} R$</p>
              </div>
              <div className="flex justify-between text-zinc-400">
                <p className="capitalize">frete</p>
                <p>10.00 R$</p>
              </div>
              <div className="flex justify-between text-zinc-400">
                <p className="capitalize">taxa da plataforma</p>
                <p>5.00 R$</p>
              </div>
              <Divider variant="middle" style={{ marginBlock: "2rem" }} />
              <div className="flex justify-between text-zinc-400">
                <p className="capitalize">valor total</p>
                <p>{totalWithFees.toFixed(2)} R$</p>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFinalizeOrder}
                disabled={!selectedAddress || cart.cartItems.length === 0}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] flex justify-center px-5 pt-10 lg:pb-0">
          <div>
            <h1 className="text-center text-zinc-300 font-semibold text-2xl py-10 capitalize font-cormorant">
              escolha o endereço de entrega
            </h1>

            <div className="flex gap-5 flex-wrap justify-center">
              {address.addresses.map((addr, index) => (
                <AddressCard
                  key={index}
                  item={addr}
                  showButton={true}
                  handleSelectAddress={() => handleSelectAddress(addr)}
                />
              ))}
              <Card
                variant="outlined"
                style={{ backgroundColor: "black" }}
                className="flex items-center justify-center w-64 p-5"
              >
                <div className="space-y-10">
                  <div className="flex items-center justify-center text-center lg:text-start gap-2 text-primary">
                    <AddLocationAltOutlined />
                    <h1 className="font-semibold capitalize">
                      adicionar endereço
                    </h1>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ fontWeight: "bold" }}
                    onClick={handleOpenAddressModal}
                  >
                    adicionar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </section>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddAddressForm onClose={handleClose} />
      </Modal>
    </>
  );
};
