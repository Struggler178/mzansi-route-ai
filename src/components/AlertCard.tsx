import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  type: "strike" | "route" | "closure";
  title: string;
  description: string;
  location: string;
  time: string;
  severity: "high" | "medium" | "low";
}

const alertConfig = {
  strike: {
    icon: AlertTriangle,
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    iconColor: "text-destructive"
  },
  route: {
    icon: MapPin,
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
    iconColor: "text-warning"
  },
  closure: {
    icon: AlertTriangle,
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    iconColor: "text-accent"
  }
};

const severityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground"
};

export function AlertCard({ type, title, description, location, time, severity }: AlertCardProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "border transition-all duration-200 hover:shadow-medium",
      config.bgColor,
      config.borderColor
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            config.bgColor
          )}>
            <Icon className={cn("h-5 w-5", config.iconColor)} />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">{title}</h3>
              <Badge className={cn("text-xs", severityColors[severity])}>
                {severity.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">{description}</p>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {time}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}