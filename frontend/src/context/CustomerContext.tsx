import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { type Customer } from "../api/customer";
import {
  createCart,
  getCart,
  applyCouponToCart,
  getCustomerCart,
  type Cart,
} from "../api/cart";

type CustomerContextType = {
  currentCustomer: Customer | null;
  currentCart: Cart | null;
  setCurrentCart: (cart: Cart | null) => void;
  loginCustomer: (customerData: Customer) => Promise<void>;
  logoutCustomer: () => Promise<void>;
  refreshCart: () => Promise<void>;
  applyCoupon: (coupon_code: string) => Promise<void>;
  isLoading: boolean;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentCart, setCurrentCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    if (!currentCart) return;
    try {
      const updatedCart = await getCart(currentCart.cart_id);
      setCurrentCart(updatedCart);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  useEffect(() => {
    const initializeCustomer = async () => {
      try {
        if (!currentCustomer) {
          return;
        }
        const cart = await getCustomerCart(currentCustomer.customer_id!);
        if (cart) {
          setCurrentCart(cart);
        } else {
          const newCart = await createCart(currentCustomer.customer_id);
          setCurrentCart(newCart);
        }
      } catch (error) {
        console.error("Failed to initialize customer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeCustomer();
  }, [currentCustomer]);

  const applyCoupon = async (coupon_code: string) => {
    if (!currentCart) return;
    try {
      const updatedCart = await applyCouponToCart(
        currentCart.cart_id,
        coupon_code
      );
      setCurrentCart(updatedCart);
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      throw error;
    }
  };

  const loginCustomer = async (customerData: Customer) => {
    try {
      setCurrentCustomer(customerData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logoutCustomer = async () => {
    try {
      setCurrentCustomer(null);
      setCurrentCart(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        currentCustomer,
        currentCart,
        setCurrentCart,
        loginCustomer,
        logoutCustomer,
        refreshCart,
        applyCoupon,
        isLoading,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
