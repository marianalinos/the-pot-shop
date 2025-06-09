import Header from "../components/Header";
import { type Order, cancelOrder, getOrdersByCustomerId } from "../api/order";
import { useCustomer } from "../context/CustomerContext";
import { useEffect, useState } from "react";

export default function Orders() {
  const { currentCustomer } = useCustomer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        getOrdersByCustomerId(currentCustomer!.customer_id!)
          .then((response) => {
            const simplifiedOrders: Order[] = [];
            response.forEach((order) => {
              const simplifiedOrder: Order = {
                order_id: order.order_id,
                created_at: new Date(order.created_at),
                status: order.status,
                total: parseFloat(order.total),
                cart_products: order.cart.products.map((product) => ({
                  product_id: product.product.product_id,
                  product_name: product.product.product_name,
                  quantity: product.quantity,
                  price: parseFloat(product.product.price),
                })),
                cupom: order.cart.coupon ? order.cart.coupon.code : null,
              };
              simplifiedOrders.push(simplifiedOrder);
            });
            setOrders(simplifiedOrders);
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          });
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentCustomer) {
      fetchOrders();
    }
  }, [currentCustomer]);

  return (
    <div className="min-h-screen min-w-screen bg-[#432e56] text-[#b98dc2]">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl mb-8 text-center text-shadow-lg shadow-black/50 border-b-4 border-[#b98dc2] pb-4">
          SEUS PEDIDOS
        </h1>

        {isLoading ? (
          <div className="text-center text-2xl">Carregando...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-2xl">Nenhum pedido encontrado</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.order_id}
                order={order}
                cupom={order.cupom ? order.cupom : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, cupom }: { order: Order; cupom: string | null }) {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);

  const statusColors = {
    CONCLUÍDO: "bg-[#b98dc2]",
    CANCELADO: "bg-red-900",
  };

  return (
    <>
      <div className="border-4 border-[#b98dc2] p-6 shadow-[8px_8px_0_#b98dc2] bg-[#432e56]/90">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Pedido #{currentOrder.order_id}
            </h2>
            <p className="text-lg">
              Data: {currentOrder.created_at.toLocaleDateString("pt-BR")}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              statusColors[currentOrder.status]
            }`}
          >
            {currentOrder.status.toUpperCase()}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-xl mb-2">Itens:</h3>
          <ul className="space-y-2">
            {currentOrder.cart_products.map((item) => (
              <li key={item.product_id} className="flex justify-between">
                <span>
                  {item.product_name} x{item.quantity}
                </span>
                <span>{item.price}G</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex  justify-between text-lg border-t-2 border-[#b98dc2] pt-2">
          <p>Cupom usado: {cupom ? cupom : "Nenhum"}</p>
          <p>Total: {currentOrder.total}G</p>
        </div>
        {!currentOrder.status || currentOrder.status === "CANCELADO" ? '' : (
          <button
            onClick={async () => {
              const now = new Date();
              const canCancel =
                now.getTime() - currentOrder.created_at.getTime() < 60000; 
              if (canCancel) {
                if (
                  window.confirm("Tem certeza que deseja cancelar este pedido?")
                ) {
                  await cancelOrder(currentOrder.order_id);
                  setCurrentOrder({ ...currentOrder, status: "CANCELADO" });
                }
              } else {
                alert(
                  "Você só pode cancelar pedidos dentro de 1 minuto após a criação."
                );
              }
            }}
            className="flex justify-self-end-safe pl-2 pr-2 pt-1 pb-1"
          >
            Cancelar pedido
          </button>
        )}
      </div>
    </>
  );
}
