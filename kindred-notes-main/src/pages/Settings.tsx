import { Link } from "react-router-dom";
import { ArrowLeft, User, Shield, Palette, Bell, Download, Trash2 } from "lucide-react";

const settingsSections = [
  { icon: User, label: "Profile", description: "Username, display name, avatar" },
  { icon: Shield, label: "Privacy", description: "Visibility, search settings, blocks" },
  { icon: Bell, label: "Notifications", description: "Email, push, in-app alerts" },
  { icon: Palette, label: "Appearance", description: "Themes, fonts, card styles" },
  { icon: Download, label: "Export Data", description: "Download all your memories" },
  { icon: Trash2, label: "Delete Account", description: "Permanently remove your data" },
];

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            to="/diary"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-xl font-semibold">Settings</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.label}
              className="flex w-full items-center gap-4 rounded-lg bg-card p-4 text-left shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-foreground">
                  {section.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
