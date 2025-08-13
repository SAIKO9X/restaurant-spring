import { useEffect } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../state/Order/Action";

export const Orders = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersOrders());
  }, [dispatch]);

  return (
    <section className="flex items-center flex-col">
      <h1 className="text-2xl 2xl:text-4xl text-center text-primary py-7 font-semibold font-cormorant">
        Meus Pedidos
      </h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders.map((order) =>
          order.items.map((item) => (
            <OrderCard key={item.id} order={order} item={item} />
          ))
        )}
      </div>
    </section>
  );
};
