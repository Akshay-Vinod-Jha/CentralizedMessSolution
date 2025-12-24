import { Mess, MenuItem, DietTag } from "../types";

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
