import { Lock, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewTab = "private" | "friends" | "public";

interface BottomNavProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
}

const tabs = [
  { value: "private" as const, icon: Lock, label: "Private" },
  { value: "friends" as const, icon: Users, label: "Friends" },
  { value: "public" as const, icon: Globe, label: "My Circle" },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2 transition-all",
              activeTab === tab.value
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                activeTab === tab.value && "bg-primary text-primary-foreground scale-110"
              )}
            >
              <tab.icon className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-semibold tracking-wide uppercase">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
