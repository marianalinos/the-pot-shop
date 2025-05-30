import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { type Customer, getCustomerByName } from "../api/customer";

type CustomerContextType = {
  currentCustomer: Customer | null;
  loginCustomer: (customerData: Customer) => void;
  logoutCustomer: () => void;
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
      const customerName = localStorage.getItem("potionShopCustomerName");
      if (customerName) {
        try {
          const customer = await getCustomerByName(customerName);
          if (customer) {
            loginCustomer(customer);
          } else {
            logoutCustomer();
          }
        } catch (error) {
          console.error("Failed to fetch customer:", error);
          logoutCustomer();
        }
      }
      setIsLoading(false);
    };
    initializeCustomer();
  }, []);
const loginCustomer = (customerData: Customer) => {
  // Store whatever data we have
  localStorage.setItem('potionShopCustomerName', customerData.customer_name);
  if (customerData.customer_id) {
    localStorage.setItem('potionShopCustomerId', customerData.customer_id.toString());
  }
  localStorage.setItem('potionShopWallet', customerData.wallet);
  
  setCurrentCustomer({
    customer_name: customerData.customer_name,
    wallet: customerData.wallet,
    customer_id: customerData.customer_id // Might be undefined
  });
};

  const logoutCustomer = () => {
    localStorage.removeItem("potionShopCustomerName");
    localStorage.removeItem("potionShopCustomerId");
    setCurrentCustomer(null);
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
