import axios from "axios";
import type { AxiosResponse } from "axios";

export type OrderStatus = "CONCLUÍDO" | "CANCELADO";

const API_BASE_URL = "http://localhost:3000/api";

export type Order = {
  order_id: number;
  created_at: Date;
  status: OrderStatus;
  total: number;
  cart_products: CartProducts[];
  cupom?: string | null;
};

export type CartProducts = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

export type OrderWithFullCart = {
  order_id: number;
  created_at: string;
  status: OrderStatus;
  total: string;
  customer_id: number | null;
  cart_id: number;
  cart: {
    cart_id: number;
    total: string;
    coupon_code: string | null;
    customer_id: number | null;
    products: {
      cart_product_id: number;
      cart_id: number;
      product_id: number;
      quantity: number;
      product: {
        product_id: number;
        product_name: string;
        price: string;
        image: string;
      };
    }[];
    coupon: {
      coupon_id: number;
      code: string;
      discount: string;
      expiration: string | null;
      used: boolean;
    } | null;
  };
};

export async function createOrder(cart_id: number): Promise<Order> {
  console.log("Creating order for cart_id:", cart_id);
  const response: AxiosResponse<Order> = await axios.post(
    `${API_BASE_URL}/orders`,
    {
      cart_id,
    }
  );
  return response.data;
}

export async function getOrdersByCustomerId(
  customer_id: number
): Promise<OrderWithFullCart[]> {
  console.log("Fetching orders for customer_id:", customer_id);
  const response: AxiosResponse<OrderWithFullCart[]> = await axios.get(
    `${API_BASE_URL}/orders`,
    {
      params: {
        customer_id,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  response.data.forEach((order) => {
    const cartTotal = Number(order.cart.total);

    if (cartTotal !== 0) {
      order.total = String(cartTotal);
    } else {
      const subtotal = order.cart.products.reduce((acc, product) => {
        return acc + Number(product.product.price) * product.quantity;
      }, 0);

      const discount = Number(order.cart.coupon?.discount) || 0;

      const discountedTotal =
        discount > 0 ? subtotal * ((100 - discount) / 100) : subtotal;

      order.total = String(discountedTotal);
    }
  });
  console.log("Orders fetched successfully:", response.data);
  return response.data;
}

export async function cancelOrder(order_id: number): Promise<void> {
  console.log("Cancelling order with order_id:", order_id);
  await axios.patch(
    `${API_BASE_URL}/orders/${order_id}`,
    {
      status: "CANCELADO",
    }
  );
  console.log("Order cancelled successfully");
}