import { motion } from "framer-motion";
import { Flame, Trophy, Calendar, Coins } from "lucide-react";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  lastEntryDate: string;
  coinsEarned?: number;
}

const STREAK_MILESTONES = [3, 7, 10, 14, 21, 30];

export const StreakWidget = ({
  currentStreak,
  longestStreak,
  lastEntryDate,
  coinsEarned,
}: StreakWidgetProps) => {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const activeDays = [true, true, true, false, true, true, false];

  const nextMilestone = STREAK_MILESTONES.find((m) => m > currentStreak) || 30;
  const progress = (currentStreak / nextMilestone) * 100;

  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="font-display text-base font-bold text-foreground">
            Streak
          </h3>
        </div>
        {coinsEarned !== undefined && coinsEarned > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1"
          >
            <Coins className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">+{coinsEarned}</span>
          </motion.div>
        )}
      </div>

      {/* Current streak */}
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-display text-xl font-black text-primary-foreground">
            {currentStreak}
          </span>
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-foreground">days in a row</p>
          <p className="text-xs text-muted-foreground">
            {nextMilestone - currentStreak} more to earn coins!
          </p>
        </div>
      </div>

      {/* Progress to next milestone */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
          <span>{currentStreak} days</span>
          <span>{nextMilestone}-day reward</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      {/* Week view */}
      <div className="mb-4 flex justify-between gap-1">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground">{day}</span>
            <div
              className={`h-7 w-7 rounded-full transition-colors flex items-center justify-center text-[10px] font-bold ${
                activeDays[i]
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {activeDays[i] ? "✓" : ""}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-4 border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">
            Best: <span className="font-semibold text-foreground">{longestStreak}d</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-snap-blue" />
          <span className="text-xs text-muted-foreground">
            Last: <span className="font-semibold text-foreground">{lastEntryDate}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
