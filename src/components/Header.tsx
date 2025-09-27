import { LanguageSelector } from "@/components/LanguageSelector";
import { AuthButtons } from "@/components/AuthButtons";
import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-warm shadow-soft">
            <Globe className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">TaxiAI</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}