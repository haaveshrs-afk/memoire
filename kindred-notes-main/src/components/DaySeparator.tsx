interface DaySeparatorProps {
  date: string;
}

export const DaySeparator = ({ date }: DaySeparatorProps) => {
  const d = new Date(date);
  const isToday = new Date().toDateString() === d.toDateString();
  const isYesterday =
    new Date(Date.now() - 86400000).toDateString() === d.toDateString();

  const label = isToday
    ? "Today"
    : isYesterday
    ? "Yesterday"
    : d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-border" />
      <span className="font-display text-sm font-medium text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};
