import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  Wallet,
  Order,
  Mess,
  MenuItem,
  TokenTransaction,
} from "../types";

// Storage keys
const KEYS = {
  USER: "@user",
  WALLET: "@wallet",
  ORDERS: "@orders",
  MESSES: "@messes",
  MENU_ITEMS: "@menu_items",
  ROLE: "@role",
};

// User operations
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.USER);
  } catch (error) {
    console.error("Error clearing user:", error);
  }
};

// Role operations
export const saveRole = async (role: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.ROLE, role);
  } catch (error) {
    console.error("Error saving role:", error);
    throw error;
  }
};

export const getRole = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KEYS.ROLE);
  } catch (error) {
    console.error("Error getting role:", error);
    return null;
  }
};

// Wallet operations
export const saveWallet = async (wallet: Wallet): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.WALLET, JSON.stringify(wallet));
  } catch (error) {
    console.error("Error saving wallet:", error);
    throw error;
  }
};

export const getWallet = async (): Promise<Wallet | null> => {
  try {
    const walletData = await AsyncStorage.getItem(KEYS.WALLET);
    return walletData ? JSON.parse(walletData) : null;
  } catch (error) {
    console.error("Error getting wallet:", error);
    return null;
  }
};

export const updateWalletBalance = async (
  userId: string,
  amount: number,
  transaction: TokenTransaction
): Promise<void> => {
  try {
    const wallet = await getWallet();
    if (wallet && wallet.userId === userId) {
      wallet.balance += amount;
      wallet.transactions.unshift(transaction);
      await saveWallet(wallet);
    }
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
};

// Orders operations
export const saveOrders = async (orders: Order[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders:", error);
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const ordersData = await AsyncStorage.getItem(KEYS.ORDERS);
    return ordersData ? JSON.parse(ordersData) : [];
  } catch (error) {
    console.error("Error getting orders:", error);
    return [];
  }
};

export const addOrder = async (order: Order): Promise<void> => {
  try {
    const orders = await getOrders();
    orders.unshift(order);
    await saveOrders(orders);
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// Messes operations
export const saveMesses = async (messes: Mess[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.MESSES, JSON.stringify(messes));
  } catch (error) {
    console.error("Error saving messes:", error);
    throw error;
  }
};

export const getMesses = async (): Promise<Mess[]> => {
  try {
    const messesData = await AsyncStorage.getItem(KEYS.MESSES);
    return messesData ? JSON.parse(messesData) : [];
  } catch (error) {
    console.error("Error getting messes:", error);
    return [];
  }
};

// Menu items operations
export const saveMenuItems = async (menuItems: MenuItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.MENU_ITEMS, JSON.stringify(menuItems));
  } catch (error) {
    console.error("Error saving menu items:", error);
    throw error;
  }
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const menuItemsData = await AsyncStorage.getItem(KEYS.MENU_ITEMS);
    return menuItemsData ? JSON.parse(menuItemsData) : [];
  } catch (error) {
    console.error("Error getting menu items:", error);
    return [];
  }
};

export const getMenuItemsByMessId = async (
  messId: string
): Promise<MenuItem[]> => {
  try {
    const allMenuItems = await getMenuItems();
    return allMenuItems.filter((item) => item.messId === messId);
  } catch (error) {
    console.error("Error getting menu items by mess ID:", error);
    return [];
  }
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.USER,
      KEYS.WALLET,
      KEYS.ORDERS,
      KEYS.ROLE,
    ]);
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};
