import {
  Mess,
  MenuItem,
  DietTag,
  UserRole,
  Wallet,
  Order,
  TokenTransaction,
} from "../types";

// Default data for new users based on their role
export const defaultUserData = {
  student: {
    tokenBalance: 100,
    welcomeBonus: 100,
    transactions: [
      {
        type: "credit" as const,
        amount: 100,
        description: "Welcome bonus - Start your food journey!",
        daysAgo: 0,
      },
      {
        type: "debit" as const,
        amount: -15,
        description: "Order from Sunshine Mess - Lunch",
        daysAgo: 1,
      },
      {
        type: "credit" as const,
        amount: 50,
        description: "Monthly token recharge",
        daysAgo: 2,
      },
      {
        type: "debit" as const,
        amount: -8,
        description: "Order from Spice Garden - Breakfast",
        daysAgo: 3,
      },
      {
        type: "transfer-sent" as const,
        amount: -10,
        description: "Transferred to friend",
        daysAgo: 5,
      },
      {
        type: "transfer-received" as const,
        amount: 20,
        description: "Received from roommate",
        daysAgo: 7,
      },
    ],
    // Sample orders for demo
    sampleOrders: [
      {
        messName: "Sunshine Mess",
        items: [
          { name: "Paneer Butter Masala", quantity: 1, tokensPerItem: 4 },
        ],
        totalTokens: 4,
        status: "delivered" as const,
        daysAgo: 2,
      },
    ],
  },
  "mess-owner": {
    tokenBalance: 0,
    stats: {
      todayOrders: 12,
      tokensEarned: 45,
      activeOrders: 3,
      totalRevenue: 245,
      totalOrders: 156,
    },
    sampleOrders: [
      {
        id: "order-demo-1",
        userId: "student-demo-1",
        messName: "My Mess",
        items: [
          { name: "Paneer Butter Masala", quantity: 2, tokensPerItem: 4 },
          { name: "Roti", quantity: 4, tokensPerItem: 1 },
        ],
        totalTokens: 12,
        status: "preparing" as const,
        orderType: "normal" as const,
        deliveryRequested: false,
        hoursAgo: 0.5,
      },
      {
        id: "order-demo-2",
        userId: "student-demo-2",
        messName: "My Mess",
        items: [
          { name: "Dal Tadka", quantity: 1, tokensPerItem: 3 },
          { name: "Rice", quantity: 1, tokensPerItem: 2 },
        ],
        totalTokens: 5,
        status: "confirmed" as const,
        orderType: "packed" as const,
        deliveryRequested: true,
        hoursAgo: 1,
      },
      {
        id: "order-demo-3",
        userId: "student-demo-3",
        messName: "My Mess",
        items: [{ name: "Chicken Biryani", quantity: 1, tokensPerItem: 6 }],
        totalTokens: 6,
        status: "ready" as const,
        orderType: "normal" as const,
        deliveryRequested: false,
        hoursAgo: 0.25,
      },
    ],
    welcomeMessage: "Welcome! You have orders to manage.",
  },
  provider: {
    tokenBalance: 85,
    stats: {
      availableMeals: 12,
      preOrders: 5,
      tokensEarned: 85,
      completedOrders: 23,
      rating: 4.5,
    },
    samplePreOrders: [
      {
        id: "preorder-1",
        studentName: "Rahul Kumar",
        meal: "Veg Thali",
        quantity: 2,
        tokens: 12,
        deliveryTime: "1:00 PM",
        status: "pending" as const,
        hoursFromNow: 2,
      },
      {
        id: "preorder-2",
        studentName: "Priya Sharma",
        meal: "Chicken Biryani",
        quantity: 1,
        tokens: 8,
        deliveryTime: "1:30 PM",
        status: "confirmed" as const,
        hoursFromNow: 2.5,
      },
      {
        id: "preorder-3",
        studentName: "Amit Verma",
        meal: "Paneer Wrap",
        quantity: 3,
        tokens: 15,
        deliveryTime: "2:00 PM",
        status: "pending" as const,
        hoursFromNow: 3,
      },
    ],
    recentOrders: [
      {
        id: "completed-1",
        studentName: "Sarah Ali",
        meal: "Dal Rice Combo",
        tokens: 6,
        deliveredAt: "Yesterday",
        rating: 5,
      },
      {
        id: "completed-2",
        studentName: "John Doe",
        meal: "Roti Sabzi",
        tokens: 10,
        deliveredAt: "2 days ago",
        rating: 4,
      },
    ],
    welcomeMessage: "Welcome! You have 5 pre-orders to prepare.",
  },
};

export const mockMesses: Mess[] = [
  {
    id: "mess-1",
    name: "Sunshine Mess",
    description:
      "Fresh homemade food with variety of options. Known for North Indian cuisine.",
    rating: 4.5,
    totalRatings: 234,
    dietTags: ["Veg", "Jain"],
    location: "Near Main Gate, Campus Road",
    openingHours: "7:00 AM - 10:00 PM",
    ownerId: "owner-1",
    pricePerMeal: 3,
  },
  {
    id: "mess-2",
    name: "Spice Garden",
    description: "Authentic South Indian meals with fresh ingredients daily.",
    rating: 4.7,
    totalRatings: 189,
    dietTags: ["Veg", "Non-Veg"],
    location: "Block A, First Floor",
    openingHours: "6:30 AM - 9:30 PM",
    ownerId: "owner-2",
    pricePerMeal: 4,
  },
  {
    id: "mess-3",
    name: "Green Leaf",
    description:
      "Purely vegetarian mess focusing on healthy and nutritious meals.",
    rating: 4.3,
    totalRatings: 156,
    dietTags: ["Veg", "Vegan", "Jain"],
    location: "Hostel Block C",
    openingHours: "7:00 AM - 9:00 PM",
    ownerId: "owner-3",
    pricePerMeal: 3,
  },
  {
    id: "mess-4",
    name: "Royal Taste",
    description:
      "Premium quality non-veg and veg options with continental dishes.",
    rating: 4.6,
    totalRatings: 201,
    dietTags: ["Veg", "Non-Veg", "Halal"],
    location: "Near Library, Ground Floor",
    openingHours: "8:00 AM - 10:30 PM",
    ownerId: "owner-4",
    pricePerMeal: 5,
  },
  {
    id: "mess-5",
    name: "Healthy Bites",
    description:
      "Focus on nutrition with balanced meals and fresh ingredients.",
    rating: 4.4,
    totalRatings: 178,
    dietTags: ["Veg", "Vegan"],
    location: "Sports Complex Area",
    openingHours: "7:30 AM - 9:00 PM",
    ownerId: "owner-5",
    pricePerMeal: 4,
  },
];

export const mockMenuItems: MenuItem[] = [
  // Sunshine Mess (mess-1) - Veg/Jain
  {
    id: "item-1",
    name: "Paneer Butter Masala",
    description: "Rich and creamy paneer curry with rice and roti",
    price: 4,
    dietTag: "Veg",
    category: "lunch",
    available: true,
    messId: "mess-1",
  },
  {
    id: "item-2",
    name: "Dal Tadka Combo",
    description: "Yellow dal with jeera rice, roti and salad",
    price: 3,
    dietTag: "Veg",
    category: "lunch",
    available: true,
    messId: "mess-1",
  },
  {
    id: "item-3",
    name: "Aloo Paratha Breakfast",
    description: "Fresh aloo paratha with curd and pickle",
    price: 2,
    dietTag: "Jain",
    category: "breakfast",
    available: true,
    messId: "mess-1",
  },
  {
    id: "item-4",
    name: "Chole Bhature",
    description: "Spicy chickpea curry with fluffy bhature",
    price: 3,
    dietTag: "Veg",
    category: "breakfast",
    available: true,
    messId: "mess-1",
  },

  // Spice Garden (mess-2) - Veg/Non-Veg South Indian
  {
    id: "item-5",
    name: "Masala Dosa",
    description: "Crispy dosa with potato filling, sambar and chutney",
    price: 3,
    dietTag: "Veg",
    category: "breakfast",
    available: true,
    messId: "mess-2",
  },
  {
    id: "item-6",
    name: "Idli Sambar",
    description: "Soft idlis served with sambar and coconut chutney",
    price: 2,
    dietTag: "Veg",
    category: "breakfast",
    available: true,
    messId: "mess-2",
  },
  {
    id: "item-7",
    name: "Chicken Biryani",
    description: "Aromatic biryani with tender chicken pieces and raita",
    price: 6,
    dietTag: "Non-Veg",
    category: "lunch",
    available: true,
    messId: "mess-2",
  },
  {
    id: "item-8",
    name: "Fish Curry Meal",
    description: "Fresh fish curry with rice and rasam",
    price: 5,
    dietTag: "Non-Veg",
    category: "dinner",
    available: true,
    messId: "mess-2",
  },

  // Green Leaf (mess-3) - Veg/Vegan/Jain
  {
    id: "item-9",
    name: "Quinoa Salad Bowl",
    description: "Healthy quinoa with fresh vegetables and tahini dressing",
    price: 4,
    dietTag: "Vegan",
    category: "lunch",
    available: true,
    messId: "mess-3",
  },
  {
    id: "item-10",
    name: "Brown Rice Thali",
    description:
      "Wholesome thali with brown rice, dal, and seasonal vegetables",
    price: 4,
    dietTag: "Veg",
    category: "lunch",
    available: true,
    messId: "mess-3",
  },
  {
    id: "item-11",
    name: "Oats Porridge",
    description: "Healthy oats with fruits and nuts",
    price: 2,
    dietTag: "Vegan",
    category: "breakfast",
    available: true,
    messId: "mess-3",
  },

  // Royal Taste (mess-4) - Premium Veg/Non-Veg/Halal
  {
    id: "item-12",
    name: "Mutton Rogan Josh",
    description: "Premium mutton curry with naan and rice",
    price: 7,
    dietTag: "Halal",
    category: "dinner",
    available: true,
    messId: "mess-4",
  },
  {
    id: "item-13",
    name: "Veg Hakka Noodles",
    description: "Indo-Chinese style noodles with vegetables",
    price: 4,
    dietTag: "Veg",
    category: "dinner",
    available: true,
    messId: "mess-4",
  },
  {
    id: "item-14",
    name: "Grilled Chicken",
    description: "Tandoori chicken with mint chutney and salad",
    price: 6,
    dietTag: "Halal",
    category: "lunch",
    available: true,
    messId: "mess-4",
  },

  // Healthy Bites (mess-5) - Veg/Vegan
  {
    id: "item-15",
    name: "Sprouts Salad",
    description: "Mixed sprouts with fresh vegetables and lemon dressing",
    price: 3,
    dietTag: "Vegan",
    category: "snacks",
    available: true,
    messId: "mess-5",
  },
  {
    id: "item-16",
    name: "Whole Wheat Pasta",
    description: "Healthy pasta with vegetables and light sauce",
    price: 4,
    dietTag: "Veg",
    category: "lunch",
    available: true,
    messId: "mess-5",
  },
];

// Helper function to initialize mock data
export const initializeMockData = async () => {
  const { saveMesses, saveMenuItems } = await import("./storage");

  try {
    await saveMesses(mockMesses);
    await saveMenuItems(mockMenuItems);
    console.log("Mock data initialized successfully");
  } catch (error) {
    console.error("Error initializing mock data:", error);
  }
};

// Helper function to create initial wallet for user based on role
export const createDefaultWallet = (userId: string, role: UserRole): Wallet => {
  const defaults = defaultUserData[role];
  const balance = defaults.tokenBalance;
  const transactions: TokenTransaction[] = [];
  const now = new Date();

  // Add all default transactions for students
  if (role === "student" && defaults.transactions) {
    defaults.transactions.forEach((txn, index) => {
      const txnDate = new Date(
        now.getTime() - (txn.daysAgo || 0) * 24 * 60 * 60 * 1000
      );
      transactions.push({
        id: `txn-${Date.now()}-${index}`,
        userId,
        type: txn.type,
        amount: txn.amount,
        description: txn.description,
        timestamp: txnDate.toISOString(),
      });
    });
  }

  return {
    userId,
    balance,
    transactions: transactions.reverse(), // Most recent first
  };
};

// Helper function to create sample orders for mess owners
export const createSampleOrders = (userId: string, messId: string): Order[] => {
  const sampleOrders = defaultUserData["mess-owner"].sampleOrders;
  const now = new Date();

  return sampleOrders.map((sample, index) => {
    const orderTime = new Date(
      now.getTime() - sample.hoursAgo * 60 * 60 * 1000
    );

    return {
      id: `${sample.id}-${userId}`,
      userId: `student-${userId}-${index}`,
      messId: messId,
      messName: sample.messName,
      items: sample.items.map((item) => ({
        menuItemId: `menu-${index}`,
        name: item.name,
        quantity: item.quantity,
        tokensPerItem: item.tokensPerItem,
      })),
      totalTokens: sample.totalTokens,
      status: sample.status,
      orderType: sample.orderType,
      deliveryRequested: sample.deliveryRequested,
      createdAt: orderTime.toISOString(),
    };
  });
};
