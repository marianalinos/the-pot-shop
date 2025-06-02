import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";
import { getCartProducts, updateCartProduct, removeCartProduct, type CartProduct } from "../api/cart-product";

export default function Cart() {
  const { currentCart } = useCustomer();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      console.log("Current cart:", currentCart);
      console.log("Fetching cart items for cart ID:", currentCart?.cart_id);
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

  const updateQuantity = async (cartProductId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartProduct(cartProductId, newQuantity);
      setCartItems(items => items.map(item => 
        item.cart_product_id === cartProductId 
          ? { ...item, quantity: newQuantity } 
          : item
      ));
    } catch (err) {
      setError("Failed to update quantity");
      console.error(err);
    }
  };

  const removeItem = async (cartProductId: number) => {
    try {
      await removeCartProduct(cartProductId);
      setCartItems(items => items.filter(item => item.cart_product_id !== cartProductId));
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
        <Link to="/products" className="text-2xl text-purple-400 hover:text-purple-300">
          Browse Products →
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 20;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.cart_product_id} className="border border-gray-200 rounded-lg p-4 flex items-center">
              <img 
                src={item.product?.image} 
                alt={item.product?.product_name} 
                className="w-20 h-20 object-cover rounded mr-4"
              />
              
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{item.product?.product_name}</h3>
                <p className="text-gray-600">${item.product?.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateQuantity(item.cart_product_id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.cart_product_id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border rounded"
                >
                  +
                </button>
              </div>
              
              <div className="ml-4 text-right">
                <p className="font-semibold">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
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
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Proceed to Checkout
          </button>
          
          {currentCart?.coupon_code && (
            <div className="mt-4 text-sm text-green-600">
              Coupon applied: {currentCart.coupon_code}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}