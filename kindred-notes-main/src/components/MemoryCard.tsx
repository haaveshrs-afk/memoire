import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodBadge } from "./MoodBadge";
import { Lock, Users, Globe, Heart, MessageCircle, Send } from "lucide-react";

interface Memory {
  id: string;
  content: string;
  mood: string;
  visibility: "private" | "shared" | "circle";
  createdAt: string;
  images?: string[];
  reactions?: number;
  comments?: number;
}

const visibilityIcon = {
  private: <Lock className="h-3.5 w-3.5" />,
  shared: <Users className="h-3.5 w-3.5" />,
  circle: <Globe className="h-3.5 w-3.5" />,
};

const visibilityLabel = {
  private: "Only me",
  shared: "Friends",
  circle: "My circle",
};

interface MemoryCardProps {
  memory: Memory;
  index?: number;
}

export const MemoryCard = ({ memory, index = 0 }: MemoryCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(memory.reactions || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const time = new Date(memory.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, commentText.trim()]);
    setCommentText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="group relative rounded-2xl bg-card p-4 shadow-soft transition-shadow hover:shadow-card"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MoodBadge mood={memory.mood} />
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          {visibilityIcon[memory.visibility]}
          <span className="text-[11px]">{visibilityLabel[memory.visibility]}</span>
        </div>
      </div>

      {/* Content */}
      <p className="mb-3 font-body text-sm leading-relaxed text-foreground/90">
        {memory.content}
      </p>

      {/* Images */}
      {memory.images && memory.images.length > 0 && (
        <div className="mb-3 grid gap-1.5 rounded-xl overflow-hidden" style={{
          gridTemplateColumns: memory.images.length === 1 ? "1fr" : "1fr 1fr",
        }}>
          {memory.images.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden bg-muted"
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-xs transition-all"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={liked ? "liked" : "not-liked"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  liked ? "fill-snap-red text-snap-red" : "hover:text-snap-red"
                }`}
              />
              <span className={liked ? "text-snap-red font-medium" : ""}>
                {likeCount}
              </span>
            </motion.div>
          </AnimatePresence>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-xs transition-colors hover:text-snap-blue"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{(memory.comments || 0) + comments.length}</span>
        </button>
      </div>

      {/* Comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 border-t border-border pt-3 space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="rounded-lg bg-muted px-3 py-2 text-xs text-foreground">
                  {c}
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-full bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="rounded-full bg-primary p-2 text-primary-foreground disabled:opacity-40"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
