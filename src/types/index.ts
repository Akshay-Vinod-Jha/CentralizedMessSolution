// Core types for the Mess Platform application

export type UserRole = "student" | "mess-owner" | "provider";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface Mess {
  id: string;
  name: string;
  description: string;
  rating: number;
  totalRatings: number;
  dietTags: DietTag[];
  image?: string;
  location: string;
  openingHours: string;
  ownerId: string;
  pricePerMeal: number;
}

export type DietTag = "Veg" | "Non-Veg" | "Vegan" | "Jain" | "Halal";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietTag: DietTag;
  category: "breakfast" | "lunch" | "dinner" | "snacks";
  available: boolean;
  messId: string;
}

export interface Order {
  id: string;
  userId: string;
  messId: string;
  messName: string;
  items: OrderItem[];
  totalTokens: number;
  status: OrderStatus;
  orderType: "normal" | "packed";
  deliveryRequested: boolean;
  deliveryAddress?: string;
  createdAt: string;
  completedAt?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  tokensPerItem: number;
  customization?: MealCustomization;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface MealCustomization {
  portionSize: "small" | "regular" | "large";
  addOns: string[];
  specialInstructions?: string;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  type: "credit" | "debit" | "transfer-sent" | "transfer-received";
  amount: number;
  description: string;
  relatedUserId?: string;
  relatedUserName?: string;
  orderId?: string;
  timestamp: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  transactions: TokenTransaction[];
}

export interface DeliveryRequest {
  id: string;
  orderId: string;
  userId: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: "pending" | "assigned" | "picked-up" | "delivered";
  deliveryFee: number;
  createdAt: string;
}

export interface Provider {
  id: string;
  name: string;
  type: "tiffin" | "small-food";
  rating: number;
  available: boolean;
  specialties: string[];
  priceRange: string;
}
