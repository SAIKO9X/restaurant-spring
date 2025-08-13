import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../../state/Order/Action";

export const Payments = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  const translateOrderStatus = (status) => {
    const statusTranslation = {
      PENDING: "PENDENTE",
      OUT_FOR_DELIVERY: "A CAMINHO",
      DELIVERED: "ENTREGUE",
      CANCELLED: "CANCELADO",
    };

    return statusTranslation[status] || status;
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "OUT_FOR_DELIVERY":
        return "bg-amber-100 text-amber-800";
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    dispatch(getUsersOrders());
  }, [dispatch]);

  return (
    <section className="mt-20 container mx-auto px-4">
      <h1 className="font-cormorant text-primary text-4xl text-center mb-8">
        Meus Pagamentos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-zinc-100">
                Pedido #{order.id}
              </h2>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-zinc-100">Valor Total:</p>
                <p className="font-medium text-primary">
                  {order.totalPrice} R$
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-zinc-100">Status:</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClass(
                    order.orderStatus
                  )}`}
                >
                  {translateOrderStatus(order.orderStatus)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {order.orders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-zinc-100 text-lg">
            Você ainda não tem pagamentos registrados.
          </p>
        </div>
      )}
    </section>
  );
};
