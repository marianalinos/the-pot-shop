import Header from "../components/Header";
import { type Order, type CartProducts } from "../api/order";
import { useCustomer } from "../context/CustomerContext";
import { useEffect, useState } from "react";

export default function Orders() {
  const { currentCustomer } = useCustomer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const mockOrders: Order[] = [
          {
            order_id: 1,
            created_at: new Date("2023-05-15"),
            status: "Concluído",
            total: 125.75,
            cart_products: [
              {
                product_id: 101,
                product_name: "Healing pot",
                quantity: 2,
                price: 50.0,
              },
              {
                product_id: 102,
                product_name: "??? pot",
                quantity: 1,
                price: 25.75,
              },
            ],
          },
          {
            order_id: 2,
            created_at: new Date("2023-05-10"),
            status: "Cancelado",
            total: 75.5,
            cart_products: [
              {
                product_id: 103,
                product_name: "Scary pot",
                quantity: 3,
                price: 25.0,
              },
            ],
          },
        ];

        setOrders(mockOrders);
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
              <OrderCard key={order.order_id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const statusColors = {
    Concluído: "bg-[#b98dc2]",
    Cancelado: "bg-red-900",
  };

  return (
    <div className="border-4 border-[#b98dc2] p-6 shadow-[8px_8px_0_#b98dc2] bg-[#432e56]/90">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">Pedido #{order.order_id}</h2>
          <p className="text-lg">
            Data: {order.created_at.toLocaleDateString("pt-BR")}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-white ${
            statusColors[order.status]
          }`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Itens:</h3>
        <ul className="space-y-2">
          {order.cart_products.map((item) => (
            <li key={item.product_id} className="flex justify-between">
              <span>
                {item.product_name} x{item.quantity}
              </span>
              <span>{item.price}G</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-end text-lg border-t-2 border-[#b98dc2] pt-2">
        <p>Cupom usado: ESTE AQUI</p>
        <p>Total: {order.total}</p>
      </div>
    </div>
  );
}
