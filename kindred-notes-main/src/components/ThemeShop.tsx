import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Coins, Palette } from "lucide-react";
import { Button } from "./ui/button";

interface Theme {
  id: string;
  name: string;
  price: number;
  colors: string[];
  owned: boolean;
}

const themes: Theme[] = [
  { id: "sunset", name: "Sunset Vibes", price: 50, colors: ["#FF6B35", "#F7C59F", "#2E294E"], owned: false },
  { id: "ocean", name: "Deep Ocean", price: 75, colors: ["#0077B6", "#00B4D8", "#90E0EF"], owned: false },
  { id: "forest", name: "Forest Walk", price: 60, colors: ["#2D6A4F", "#52B788", "#D8F3DC"], owned: false },
  { id: "midnight", name: "Midnight", price: 100, colors: ["#1A1A2E", "#16213E", "#E94560"], owned: false },
  { id: "lavender", name: "Lavender Dream", price: 80, colors: ["#7B2CBF", "#C77DFF", "#E0AAFF"], owned: false },
  { id: "cherry", name: "Cherry Blossom", price: 90, colors: ["#FFB5A7", "#F8AD9D", "#FCD5CE"], owned: false },
];

interface ThemeShopProps {
  open: boolean;
  onClose: () => void;
  balance: number;
  onPurchase: (themeId: string, price: number) => boolean;
}

export const ThemeShop = ({ open, onClose, balance, onPurchase }: ThemeShopProps) => {
  const [ownedThemes, setOwnedThemes] = useState<Set<string>>(new Set());
  const [purchasedMessage, setPurchasedMessage] = useState<string | null>(null);

  const handleBuy = (theme: Theme) => {
    if (ownedThemes.has(theme.id)) return;
    const success = onPurchase(theme.id, theme.price);
    if (success) {
      setOwnedThemes((prev) => new Set([...prev, theme.id]));
      setPurchasedMessage(`🎉 "${theme.name}" unlocked!`);
      setTimeout(() => setPurchasedMessage(null), 2000);
    } else {
      setPurchasedMessage("Not enough coins!");
      setTimeout(() => setPurchasedMessage(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 bottom-0 top-[15%] z-50 mx-auto max-w-md overflow-auto rounded-t-3xl bg-card p-6 shadow-elevated sm:inset-x-auto sm:bottom-auto sm:top-[10%] sm:rounded-3xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold">Theme Shop</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-bold text-primary">{balance}</span>
                </div>
                <button onClick={onClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {purchasedMessage && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 rounded-xl bg-primary/10 p-3 text-center text-sm font-semibold text-primary"
              >
                {purchasedMessage}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => {
                const owned = ownedThemes.has(theme.id);
                return (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl border border-border bg-background p-4 transition-shadow hover:shadow-card"
                  >
                    <div className="mb-3 flex gap-1">
                      {theme.colors.map((c, i) => (
                        <div
                          key={i}
                          className="h-8 flex-1 rounded-lg"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{theme.name}</p>
                    <div className="flex items-center justify-between">
                      {owned ? (
                        <div className="flex items-center gap-1 text-snap-green">
                          <Check className="h-3.5 w-3.5" />
                          <span className="text-xs font-semibold">Owned</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Coins className="h-3 w-3" />
                            <span className="text-xs font-semibold">{theme.price}</span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleBuy(theme)}
                            disabled={balance < theme.price}
                            className="h-7 rounded-full bg-primary px-3 text-[11px] font-bold text-primary-foreground"
                          >
                            Buy
                          </Button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
