import { Plus, Search, Bell, Settings, Ghost } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface DiaryHeaderProps {
  onNewMemory: () => void;
}

export const DiaryHeader = ({ onNewMemory }: DiaryHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Ghost className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-extrabold text-foreground">
            memoir
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
          </button>
          <Link
            to="/settings"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onNewMemory}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-shadow hover:shadow-card"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};
