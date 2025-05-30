import { useState } from "react";
import Header from "../components/Header";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type Potion = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Cart() {
  // Sample cart data - replace with your actual state management
  const [cartItems, setCartItems] = useState<Potion[]>([
    {
      id: 1,
      name: "Health Potion",
      price: 50,
      image: "🧪", // Replace with actual image path
      quantity: 3,
    },
    {
      id: 2,
      name: "Mana Elixir",
      price: 75,
      image: "🔮", // Replace with actual image path
      quantity: 1,
    },
    {
      id: 3,
      name: "Stamina Brew",
      price: 40,
      image: "🍶", // Replace with actual image path
      quantity: 2,
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header cartItemCount={cartItems.length} />
      <div className="align-middle px-40">
        <div className="p-6 bg-[#432e56]/90">

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl mb-4">
                Seu carrinho está vazio!
              </p>
              <Link
                to="/products"
                className="text-2xl hover:text-[#d4b3da] hover:border-[#d4b3da]"
              >
                Navegar Poções →
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-2 border-[#b98dc2] p-4 bg-[#432e56]/70"
                  >
                    <div className="text-4xl mr-4 w-16 h-16 flex items-center justify-center bg-[#b98dc2]/10">
                      {item.image}
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-2xl md:text-3xl">{item.name}</h3>
                      <p className="text-xl">Gold: {item.price}g</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 text-xl flex items-center justify-center border-2 border-[#b98dc2] shadow-[2px_2px_0_#b98dc2] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                      >
                        -
                      </button>
                      <span className="text-2xl w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 text-xl flex items-center justify-center border-2 border-[#b98dc2] shadow-[2px_2px_0_#b98dc2] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                      >
                        +
                      </button>
                    </div>

                    <div className="ml-4 text-2xl w-24 text-right">
                      {item.price * item.quantity}g
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-400 hover:text-red-300"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-[#b98dc2] pt-4">
                <div className="flex justify-between text-2xl mb-6">
                  <span>Subtotal:</span>
                  <span>{subtotal}g</span>
                </div>

                <div className="flex justify-between text-2xl mb-6">
                  <span>Coupon:</span>
                  <span>{subtotal > 100 ? "FREE" : "20g"}</span>
                </div>

                <div className="flex justify-between text-3xl border-t-2 border-[#b98dc2] pt-2 mb-8">
                  <span>Total:</span>
                  <span>{subtotal > 100 ? subtotal : subtotal + 20}g</span>
                </div>

                <div className="flex justify-end">
                  <button className="bg-[#432e56] text-[#b98dc2] text-2xl px-8 py-3 border-4 border-[#b98dc2] shadow-[4px_4px_0_#b98dc2] hover:bg-[#b98dc2] hover:text-[#432e56] hover:shadow-[2px_2px_0_#b98dc2] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    CHECKOUT →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
