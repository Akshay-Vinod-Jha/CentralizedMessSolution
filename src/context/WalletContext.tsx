import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Wallet, TokenTransaction } from "../types";
import { getWallet, saveWallet, updateWalletBalance } from "../utils/storage";
import { useAuth } from "./AuthContext";

interface WalletContextType {
  wallet: Wallet | null;
  isLoading: boolean;
  refreshWallet: () => Promise<void>;
  deductTokens: (
    amount: number,
    description: string,
    orderId?: string
  ) => Promise<boolean>;
  addTokens: (amount: number, description: string) => Promise<void>;
  transferTokens: (
    toUserId: string,
    toUserName: string,
    amount: number
  ) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWallet();
    }
  }, [user]);

  const loadWallet = async () => {
    try {
      setIsLoading(true);
      let walletData = await getWallet();

      // Initialize wallet if doesn't exist
      if (!walletData && user) {
        walletData = {
          userId: user.id,
          balance: 50, // Starting balance of 50 tokens
          transactions: [
            {
              id: `txn-${Date.now()}`,
              userId: user.id,
              type: "credit",
              amount: 50,
              description: "Welcome bonus",
              timestamp: new Date().toISOString(),
            },
          ],
        };
        await saveWallet(walletData);
      }

      setWallet(walletData);
    } catch (error) {
      console.error("Error loading wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWallet = async () => {
    await loadWallet();
  };

  const deductTokens = async (
    amount: number,
    description: string,
    orderId?: string
  ): Promise<boolean> => {
    if (!wallet || !user) {
      return false;
    }

    if (wallet.balance < amount) {
      return false; // Insufficient balance
    }

    try {
      const transaction: TokenTransaction = {
        id: `txn-${Date.now()}`,
        userId: user.id,
        type: "debit",
        amount: -amount,
        description,
        orderId,
        timestamp: new Date().toISOString(),
      };

      await updateWalletBalance(user.id, -amount, transaction);
      await loadWallet();
      return true;
    } catch (error) {
      console.error("Error deducting tokens:", error);
      return false;
    }
  };

  const addTokens = async (
    amount: number,
    description: string
  ): Promise<void> => {
    if (!wallet || !user) {
      return;
    }

    try {
      const transaction: TokenTransaction = {
        id: `txn-${Date.now()}`,
        userId: user.id,
        type: "credit",
        amount,
        description,
        timestamp: new Date().toISOString(),
      };

      await updateWalletBalance(user.id, amount, transaction);
      await loadWallet();
    } catch (error) {
      console.error("Error adding tokens:", error);
      throw error;
    }
  };

  const transferTokens = async (
    toUserId: string,
    toUserName: string,
    amount: number
  ): Promise<boolean> => {
    if (!wallet || !user) {
      return false;
    }

    if (wallet.balance < amount) {
      return false; // Insufficient balance
    }

    try {
      const transaction: TokenTransaction = {
        id: `txn-${Date.now()}`,
        userId: user.id,
        type: "transfer-sent",
        amount: -amount,
        description: `Transferred to ${toUserName}`,
        relatedUserId: toUserId,
        relatedUserName: toUserName,
        timestamp: new Date().toISOString(),
      };

      await updateWalletBalance(user.id, -amount, transaction);
      await loadWallet();
      return true;
    } catch (error) {
      console.error("Error transferring tokens:", error);
      return false;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isLoading,
        refreshWallet,
        deductTokens,
        addTokens,
        transferTokens,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
