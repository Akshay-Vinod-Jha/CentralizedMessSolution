import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Order } from "../types";
import { getOrders, addOrder, saveOrders } from "../utils/storage";
import { useAuth } from "./AuthContext";

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  refreshOrders: () => Promise<void>;
  placeOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
  getActiveOrders: () => Order[];
  getCompletedOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const allOrders = await getOrders();

      // Filter orders for current user if user is a student
      if (user && user.role === "student") {
        const userOrders = allOrders.filter(
          (order) => order.userId === user.id
        );
        setOrders(userOrders);
      } else {
        // For mess owners and providers, show all orders
        setOrders(allOrders);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const placeOrder = async (order: Order) => {
    try {
      await addOrder(order);
      await loadOrders();
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    try {
      const allOrders = await getOrders();
      const updatedOrders = allOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              completedAt:
                status === "delivered"
                  ? new Date().toISOString()
                  : order.completedAt,
            }
          : order
      );

      await saveOrders(updatedOrders);
      await loadOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const getActiveOrders = () => {
    return orders.filter(
      (order) => !["delivered", "cancelled"].includes(order.status)
    );
  };

  const getCompletedOrders = () => {
    return orders.filter((order) =>
      ["delivered", "cancelled"].includes(order.status)
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        refreshOrders,
        placeOrder,
        updateOrderStatus,
        getActiveOrders,
        getCompletedOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
