import { useState } from "react";
import { 
  Home, 
  Route, 
  AlertTriangle, 
  Brain, 
  Settings, 
  Menu, 
  X,
  MessageCircle,
  Globe
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Chat Assistant", url: "/chat", icon: MessageCircle },
  { title: "Routes", url: "/routes", icon: Route },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Help Train AI", url: "/train-ai", icon: Brain },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card/80 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-72 transform bg-card shadow-strong transition-transform duration-300 md:relative md:translate-x-0 md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="border-b border-border/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-warm shadow-soft">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">TaxiAI</h1>
              <p className="text-sm text-muted-foreground">Smart Transport</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.url);
            return (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-gradient-warm text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <div className="rounded-xl bg-gradient-secondary p-4 text-center">
            <p className="text-sm font-medium text-secondary-foreground mb-2">
              Need Help?
            </p>
            <p className="text-xs text-secondary-foreground/80 mb-3">
              Join our community for support and updates
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              Get Support
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}