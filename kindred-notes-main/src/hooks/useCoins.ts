import { useState, useCallback } from "react";

interface CoinLedgerEntry {
  id: string;
  type: "earned" | "spent";
  amount: number;
  reason: string;
  timestamp: string;
}

const STREAK_REWARDS: Record<number, number> = {
  3: 5,
  7: 15,
  10: 30,
  14: 50,
  21: 80,
  30: 150,
};

export function useCoins(initialBalance = 0) {
  const [ledger, setLedger] = useState<CoinLedgerEntry[]>([]);
  
  const balance = initialBalance + ledger.reduce((sum, entry) => {
    return sum + (entry.type === "earned" ? entry.amount : -entry.amount);
  }, 0);

  const earnedToday = ledger
    .filter(
      (e) =>
        e.type === "earned" &&
        new Date(e.timestamp).toDateString() === new Date().toDateString()
    )
    .reduce((sum, e) => sum + e.amount, 0);

  const earnCoins = useCallback((amount: number, reason: string) => {
    setLedger((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "earned",
        amount,
        reason,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  const spendCoins = useCallback((amount: number, reason: string): boolean => {
    if (balance < amount) return false;
    setLedger((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "spent",
        amount,
        reason,
        timestamp: new Date().toISOString(),
      },
    ]);
    return true;
  }, [balance]);

  const checkStreakReward = useCallback((streakDays: number): number | null => {
    const reward = STREAK_REWARDS[streakDays];
    if (reward) {
      earnCoins(reward, `${streakDays}-day streak reward!`);
      return reward;
    }
    return null;
  }, [earnCoins]);

  return { balance, earnedToday, ledger, earnCoins, spendCoins, checkStreakReward };
}
