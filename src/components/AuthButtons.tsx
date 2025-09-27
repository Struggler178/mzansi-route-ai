import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
        <LogIn className="h-4 w-4 mr-1" />
        Sign In
      </Button>
      <Button size="sm" className="bg-gradient-warm hover:shadow-medium transition-all duration-200">
        <UserPlus className="h-4 w-4 mr-1" />
        Sign Up
      </Button>
    </div>
  );
}