import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Shield, Users, Sparkles, Flame, ArrowRight, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-journal.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Private by Design",
    description: "Your memories belong to you. No public profiles, no discovery feeds.",
  },
  {
    icon: Shield,
    title: "Emotionally Safe",
    description: "No dark patterns, no engagement bait. Just you and your thoughts.",
  },
  {
    icon: Users,
    title: "Share by Choice",
    description: "Collaborate only with people you trust, through mutual consent.",
  },
  {
    icon: Sparkles,
    title: "Gentle AI",
    description: "Mood detection, writing prompts, and weekly reflections — never intrusive.",
  },
  {
    icon: Flame,
    title: "Streaks & Coins",
    description: "Build habits, earn coins, and unlock beautiful themes for your diary.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Ghost className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-extrabold text-foreground">
              memoir
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/diary">
              <Button variant="ghost" size="sm" className="text-muted-foreground font-semibold">
                Sign In
              </Button>
            </Link>
            <Link to="/diary">
              <Button size="sm" className="rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-6 font-display text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Your most
                <br />
                <span className="text-primary">intimate</span> diary
              </h1>
              <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-muted-foreground">
                A private space to capture memories, reflect on your journey, and
                share moments with the people who matter most.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link to="/diary">
                  <Button
                    size="lg"
                    className="rounded-full bg-primary text-primary-foreground font-bold shadow-soft hover:bg-primary/90"
                  >
                    Start Writing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground">
                  Free forever • No ads
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl shadow-elevated">
                <img
                  src={heroImage}
                  alt="A warm journal illustration"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-float rounded-2xl bg-card p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  <span className="font-display text-sm font-bold">
                    12 day streak!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 font-display text-3xl font-black text-foreground">
              Built for emotional safety
            </h2>
            <p className="text-muted-foreground">
              Every design decision puts your wellbeing first.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-base font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-display text-3xl font-black text-foreground">
              Your story deserves a safe home
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join a community that values privacy, authenticity, and emotional
              wellbeing above everything else.
            </p>
            <Link to="/diary">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground font-bold shadow-soft hover:bg-primary/90"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Ghost className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-extrabold text-foreground">
              memoir
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Your memories. Your rules. Always private.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
