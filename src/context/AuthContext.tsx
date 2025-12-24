import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User, UserRole } from "../types";
import {
  getUser,
  saveUser,
  clearUser,
  getRole,
  saveRole,
} from "../utils/storage";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  setUserRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUser = await getUser();
      const savedRole = await getRole();

      if (savedUser) {
        setUser(savedUser);
      }

      if (savedRole) {
        setRole(savedRole as UserRole);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User) => {
    try {
      await saveUser(userData);
      await saveRole(userData.role);
      setUser(userData);
      setRole(userData.role);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearUser();
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const setUserRole = async (newRole: UserRole) => {
    try {
      await saveRole(newRole);
      setRole(newRole);

      // Update user object if exists
      if (user) {
        const updatedUser = { ...user, role: newRole };
        await saveUser(updatedUser);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error setting user role:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        login,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
