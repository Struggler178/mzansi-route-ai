import { AlertCard } from "@/components/AlertCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Bell,
  RefreshCw,
  Filter
} from "lucide-react";

const activeAlerts = [
  {
    type: "strike" as const,
    title: "Major Taxi Strike - Johannesburg",
    description: "Multiple taxi associations participating in strike action. Avoid CBD routes, use alternative transport.",
    location: "Johannesburg CBD, Braamfontein",
    time: "2 hours ago",
    severity: "high" as const
  },
  {
    type: "closure" as const,
    title: "N1 Highway Closure",
    description: "Accident cleanup in progress. Expect delays of up to 60 minutes.",
    location: "N1 North, near Midrand",
    time: "30 minutes ago",
    severity: "high" as const
  },
  {
    type: "route" as const,
    title: "Service Disruption",
    description: "Limited service on Route 23 due to vehicle maintenance.",
    location: "Cape Town - Bellville",
    time: "1 hour ago",
    severity: "medium" as const
  }
];

const safetyAlerts = [
  {
    type: "route" as const,
    title: "High Crime Area Warning",
    description: "Increased criminal activity reported. Travel in groups and avoid late evening trips.",
    location: "Alexandra Township",
    time: "6 hours ago",
    severity: "high" as const
  },
  {
    type: "route" as const,
    title: "Road Condition Alert",
    description: "Poor road conditions due to recent rainfall. Drive carefully.",
    location: "Soweto - Orlando",
    time: "8 hours ago",
    severity: "medium" as const
  }
];

const routeUpdates = [
  {
    type: "route" as const,
    title: "New Express Route",
    description: "New express service from Pretoria to Johannesburg during peak hours.",
    location: "Pretoria - Johannesburg",
    time: "1 day ago",
    severity: "low" as const
  },
  {
    type: "route" as const,
    title: "Fare Adjustment",
    description: "Route fares updated to reflect current fuel costs.",
    location: "Durban Metro Routes",
    time: "2 days ago",
    severity: "medium" as const
  }
];

export default function Alerts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Live Alerts & Updates
              </h1>
              <p className="text-muted-foreground">
                Stay informed about strikes, closures, and safety information
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive animate-pulse"></div>
                    <span className="text-sm font-medium">3 Active Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">2 Safety Warnings</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last updated: 2 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Active Alerts
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                  {activeAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {safetyAlerts.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="routes" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Route Updates
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {routeUpdates.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeAlerts.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              {safetyAlerts.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </TabsContent>

            <TabsContent value="routes" className="space-y-4">
              {routeUpdates.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </TabsContent>
          </Tabs>

          {/* Emergency Section */}
          <Card className="border-destructive/20 bg-destructive/5 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Emergency Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                In case of emergency while traveling, contact these numbers:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium">Police Emergency</span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">10111</span>
                </div>
                <div className="flex items-center justify-between bg-background/50 rounded-lg p-3">
                  <span className="text-sm font-medium">Medical Emergency</span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">10177</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}