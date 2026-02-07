import { cn } from "@/lib/utils";

const moodConfig: Record<string, { emoji: string; label: string; className: string }> = {
  happy: { emoji: "😊", label: "Happy", className: "bg-primary/20 text-foreground" },
  grateful: { emoji: "🙏", label: "Grateful", className: "bg-warm-sage/20 text-foreground" },
  calm: { emoji: "😌", label: "Calm", className: "bg-warm-sky/20 text-foreground" },
  reflective: { emoji: "🤔", label: "Reflective", className: "bg-warm-lavender/20 text-foreground" },
  nostalgic: { emoji: "💭", label: "Nostalgic", className: "bg-warm-rose/20 text-foreground" },
  excited: { emoji: "🎉", label: "Excited", className: "bg-primary/20 text-foreground" },
  sad: { emoji: "😢", label: "Sad", className: "bg-warm-sky/20 text-foreground" },
  loved: { emoji: "❤️", label: "Loved", className: "bg-warm-rose/20 text-foreground" },
};

interface MoodBadgeProps {
  mood: string;
  size?: "sm" | "md";
}

export const MoodBadge = ({ mood, size = "sm" }: MoodBadgeProps) => {
  const config = moodConfig[mood] || { emoji: "📝", label: mood, className: "bg-muted text-foreground" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-body font-semibold",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.className
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};

export const moods = Object.keys(moodConfig);
export { moodConfig };
