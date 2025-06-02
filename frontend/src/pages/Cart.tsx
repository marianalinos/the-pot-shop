import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";
import {
  getCartProducts,
  updateCartProduct,
  removeCartProduct,
  type CartProduct,
} from "../api/cart-product";
import Header from "../components/Header";
import { applyCouponToCart, getCart } from "../api/cart";
import { getCouponDiscountByCode } from "../api/coupon";

export default function Cart() {
  const { currentCart, setCurrentCart } = useCustomer();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!currentCart) return;
      try {
        const items = await getCartProducts(currentCart.cart_id);
        setCartItems(items);
      } catch (err) {
        setError("Failed to load cart items");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, [currentCart]);

  useEffect(() => {
    if (!currentCart) return;
    const calculatedSubtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    setSubtotal(calculatedSubtotal);
    if (
      currentCart.coupon_code === undefined ||
      currentCart.coupon_code === null
    ) {
      setTotal(calculatedSubtotal);
      return;
    }
    getCouponDiscountByCode(currentCart?.coupon_code).then((discount) => {
      if (discount) {
        const discountAmount = (calculatedSubtotal * discount) / 100;
        setTotal(calculatedSubtotal - discountAmount);
        return total;
      }
      return total;
    });
  }, [cartItems]);

  const updateQuantity = async (cartProductId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateCartProduct(cartProductId, newQuantity);
      setCartItems((items) =>
        items.map((item) =>
          item.cart_product_id === cartProductId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      setError("Failed to update quantity");
      console.error(err);
    }
  };

  const removeItem = async (cartProductId: number) => {
    try {
      await removeCartProduct(cartProductId);
      setCartItems((items) =>
        items.filter((item) => item.cart_product_id !== cartProductId)
      );
    } catch (err) {
      setError("Failed to remove item");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!cartItems.length) {
    return (
      <div className="text-center py-12">
        <p className="text-2xl mb-4">Your cart is empty!</p>
        <Link
          to="/products"
          className="text-2xl text-purple-400 hover:text-purple-300"
        >
          Browse Products →
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cart_product_id}
                className="border border-gray-200 rounded-lg p-4 flex items-center"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.product_name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />

                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">
                    {item.product?.product_name}
                  </h3>
                  <p className="text-md">{item.product?.price}G</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_product_id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_product_id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border rounded"
                  >
                    +
                  </button>
                </div>

                <div className="ml-4 text-right">
                  <p className="font-semibold">
                    {(item.product?.price || 0) * item.quantity}G
                  </p>
                  <button
                    onClick={() => removeItem(item.cart_product_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border border-gray-200 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Resumo da compra</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal}G</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => {
                    if (currentCart) {
                      setCouponCode(e.target.value);
                      setError("");
                    }
                  }}
                  className="w-sm bg-[#432e56] border-4 border-[#b98dc2] px-4 py-3 text-lg
              focus:outline-none focus:ring-2 focus:ring-[#d4b3da] focus:border-transparent"
                  placeholder="Insira um cupom..."
                  maxLength={20}
                />
                {error && <p className="text-red-400 text-xl mt-2">{error}</p>}
                <button
                  onClick={() => {
                    if (currentCart) {
                      applyCouponToCart(currentCart.cart_id, couponCode);
                      getCart(currentCart.cart_id).then((cart) => {
                        setCurrentCart(cart);
                      });
                    }
                  }}
                  disabled={isLoading}
                  className={`w-sm text-md px-1 py-3 border-2 border-[#b98dc2] shadow-[4px_4px_0_#b98dc2] 
            hover:bg-[#b98dc2] hover:text-[#432e56] hover:shadow-[2px_2px_0_#b98dc2]
            hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Aplicar cupom
                </button>
              </div>
              {currentCart?.coupon_code && (
                <div className="text-md text-[#b98dc2]">
                  Cupom aplicado: {currentCart.coupon_code}
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{total}G</span>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
