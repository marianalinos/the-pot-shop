import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export type Customer = {
  customer_name: string;
  wallet: string;
  customer_id?: number;
};

export async function getCurrentCustomer(): Promise<Customer | null> {
  try {
    const response = await axios.get<Customer>(
      `${API_BASE_URL}/customers/current`,
      {
        validateStatus: (status) => status === 200 || status === 401
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error('Failed to fetch current customer:', error);
    return null;
  }
}

export async function addCustomer(customer_name: string): Promise<Customer> {
  try {
    const response = await axios.post<Customer>(
      `${API_BASE_URL}/customers`,
      { customer_name },
      {
        validateStatus: () => true
      }
    );

    console.log('Raw create response:', response);

    if (response.status === 201 || response.status === 200) {
      if (response.data?.customer_name) {
        return response.data;
      }
      throw new Error("Missing customer data in response");
    }

    if (response.status === 400) {
      const existingCustomer = await getCustomerByName(customer_name);
      if (existingCustomer) return existingCustomer;
      throw new Error("Customer might exist but couldn't be fetched");
    }

    throw new Error(`Unexpected response: ${response.status}`);
  } catch (error) {
    console.error('Full error:', error);
    throw new Error("Failed to process customer");
  }
}

export async function getCustomerByName(customer_name: string): Promise<Customer | null> {
  try {
    const response = await axios.get<Customer>(
      `${API_BASE_URL}/customers/${encodeURIComponent(customer_name)}`,
      {
        validateStatus: (status) => status === 200 || status === 404
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error('Lookup error:', error);
    return null;
  }
}