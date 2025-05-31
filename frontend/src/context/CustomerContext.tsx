import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import {
  type Customer,
  getCurrentCustomer,
} from "../api/customer";

type CustomerContextType = {
  currentCustomer: Customer | null;
  loginCustomer: (customerData: Customer) => Promise<void>;
  logoutCustomer: () => Promise<void>;
  isLoading: boolean;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCustomer = async () => {
      try {
        const customer = await getCurrentCustomer();
        if (customer) {
          setCurrentCustomer(customer);
        }
      } catch (error) {
        console.error("Failed to fetch current customer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeCustomer();
  }, []);

  const loginCustomer = async (customerData: Customer) => {
    try {
      setCurrentCustomer({
        customer_id: customerData.customer_id,
        customer_name: customerData.customer_name,
        wallet: customerData.wallet,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logoutCustomer = async () => {
    try {
      setCurrentCustomer(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        currentCustomer,
        loginCustomer,
        logoutCustomer,
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
