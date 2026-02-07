import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Users, Globe, Image, Sparkles } from "lucide-react";
import { MoodBadge, moods } from "./MoodBadge";
import { Button } from "./ui/button";

interface CreateMemoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (memory: {
    content: string;
    mood: string;
    visibility: "private" | "shared" | "circle";
    images?: string[];
  }) => void;
}

const visibilityOptions = [
  { value: "private" as const, icon: Lock, label: "Only me" },
  { value: "shared" as const, icon: Users, label: "Friends" },
  { value: "circle" as const, icon: Globe, label: "My circle" },
];

export const CreateMemoryModal = ({ open, onClose, onSave }: CreateMemoryModalProps) => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");
  const [visibility, setVisibility] = useState<"private" | "shared" | "circle">("private");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages((prev) => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!content.trim()) return;
    onSave({ content, mood, visibility, images: images.length > 0 ? images : undefined });
    setContent("");
    setMood("happy");
    setVisibility("private");
    setImages([]);
    onClose();
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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[8%] z-50 mx-auto max-w-lg rounded-2xl bg-card p-5 shadow-elevated sm:inset-x-auto"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">New Memory</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today..."
              className="mb-4 min-h-[100px] w-full resize-none rounded-xl border-0 bg-muted p-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />

            {/* Image previews */}
            {images.length > 0 && (
              <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div key={i} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-foreground/60 p-0.5 text-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Mood selector */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Feeling
              </p>
              <div className="flex flex-wrap gap-1.5">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`transition-all ${
                      mood === m
                        ? "scale-105 ring-2 ring-primary/50 rounded-full"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <MoodBadge mood={m} />
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Visibility
              </p>
              <div className="flex gap-2">
                {visibilityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setVisibility(opt.value)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      visibility === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <opt.icon className="h-3.5 w-3.5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <Image className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>
              <Button
                onClick={handleSave}
                disabled={!content.trim()}
                className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-40"
              >
                Save Memory
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
