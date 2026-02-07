import { Coins, TrendingUp, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface WalletWidgetProps {
  balance: number;
  earnedToday: number;
  onOpenShop?: () => void;
}

export const WalletWidget = ({ balance, earnedToday, onOpenShop }: WalletWidgetProps) => {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          <h3 className="font-display text-base font-bold text-foreground">
            Wallet
          </h3>
        </div>
        {onOpenShop && (
          <button
            onClick={onOpenShop}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <ShoppingBag className="h-3 w-3" />
            Shop
          </button>
        )}
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <motion.span
          key={balance}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="font-display text-3xl font-black text-foreground"
        >
          {balance}
        </motion.span>
        <span className="text-sm text-muted-foreground">coins</span>
      </div>

      <div className="flex items-center gap-1 text-snap-green">
        <TrendingUp className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold">+{earnedToday} earned today</span>
      </div>
    </div>
  );
};
