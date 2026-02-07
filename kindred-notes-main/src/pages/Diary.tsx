import { useState } from "react";
import { DiaryHeader } from "@/components/DiaryHeader";
import { MemoryCard } from "@/components/MemoryCard";
import { StreakWidget } from "@/components/StreakWidget";
import { WalletWidget } from "@/components/WalletWidget";
import { DaySeparator } from "@/components/DaySeparator";
import { CreateMemoryModal } from "@/components/CreateMemoryModal";
import { BottomNav, type ViewTab } from "@/components/BottomNav";
import { ThemeShop } from "@/components/ThemeShop";
import { useCoins } from "@/hooks/useCoins";

const mockMemories = [
  {
    id: "1",
    content:
      "Had the most wonderful morning walk today. The autumn leaves are turning golden, and the air smelled like cinnamon and earth.",
    mood: "grateful",
    visibility: "private" as const,
    createdAt: new Date().toISOString(),
    reactions: 0,
    comments: 0,
  },
  {
    id: "2",
    content:
      "Cooked dinner with Mom tonight. She taught me her secret pasta recipe — the one she never writes down.",
    mood: "loved",
    visibility: "shared" as const,
    createdAt: new Date().toISOString(),
    reactions: 3,
    comments: 1,
  },
  {
    id: "3",
    content:
      "Finished reading that book I've been putting off for months. The ending hit me harder than expected.",
    mood: "reflective",
    visibility: "private" as const,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    reactions: 0,
    comments: 0,
  },
  {
    id: "4",
    content:
      "Late night drive with no destination. Windows down, favorite playlist on. The city looks so different at 2am.",
    mood: "calm",
    visibility: "circle" as const,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    reactions: 5,
    comments: 2,
  },
  {
    id: "5",
    content:
      "Got the job offer! All those late nights studying and practicing interviews finally paid off. I'm so proud of myself!",
    mood: "excited",
    visibility: "shared" as const,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    reactions: 12,
    comments: 4,
  },
];

const Diary = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [memories, setMemories] = useState(mockMemories);
  const [activeTab, setActiveTab] = useState<ViewTab>("private");
  const { balance, earnedToday, earnCoins, spendCoins } = useCoins(240);

  const handleSave = (memory: {
    content: string;
    mood: string;
    visibility: "private" | "shared" | "circle";
    images?: string[];
  }) => {
    const newMemory = {
      id: Date.now().toString(),
      ...memory,
      createdAt: new Date().toISOString(),
      reactions: 0,
      comments: 0,
    };
    setMemories([newMemory, ...memories]);
    earnCoins(5, "New memory created");
  };

  const handlePurchaseTheme = (_themeId: string, price: number): boolean => {
    return spendCoins(price, `Theme purchase`);
  };

  // Filter by tab
  const filtered = memories.filter((m) => {
    if (activeTab === "private") return m.visibility === "private";
    if (activeTab === "friends") return m.visibility === "shared";
    if (activeTab === "public") return m.visibility === "circle";
    return true;
  });

  // Group by date
  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach((m) => {
    const dateKey = new Date(m.createdAt).toDateString();
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(m);
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <DiaryHeader onNewMemory={() => setShowModal(true)} />

      <div className="mx-auto max-w-2xl px-4 py-4">
        {/* Widgets row */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StreakWidget
            currentStreak={12}
            longestStreak={34}
            lastEntryDate="Today"
            coinsEarned={earnedToday}
          />
          <WalletWidget
            balance={balance}
            earnedToday={earnedToday}
            onOpenShop={() => setShowShop(true)}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {Object.keys(grouped).length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-muted-foreground">
                No memories here yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeTab === "private"
                  ? "Your private thoughts will appear here"
                  : activeTab === "friends"
                  ? "Memories shared with friends show here"
                  : "Posts visible to your circle appear here"}
              </p>
            </div>
          )}
          {Object.entries(grouped).map(([dateKey, mems]) => (
            <div key={dateKey}>
              <DaySeparator date={dateKey} />
              <div className="space-y-3">
                {mems.map((memory, i) => (
                  <MemoryCard key={memory.id} memory={memory} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <CreateMemoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      <ThemeShop
        open={showShop}
        onClose={() => setShowShop(false)}
        balance={balance}
        onPurchase={handlePurchaseTheme}
      />
    </div>
  );
};

export default Diary;
