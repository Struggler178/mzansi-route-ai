import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiveLocationMap from "@/components/LiveLocationMap";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Star,
  Route,
  TrendingUp,
  Navigation
} from "lucide-react";

const popularRoutes = [
  {
    from: "Johannesburg CBD",
    to: "Soweto",
    fare: "R15 - R20",
    duration: "45 min",
    frequency: "Every 5 min",
    rating: 4.5,
    passengers: "12-16"
  },
  {
    from: "Sandton",
    to: "Alexandra",
    fare: "R12 - R18",
    duration: "30 min",
    frequency: "Every 10 min",
    rating: 4.2,
    passengers: "12-16"
  },
  {
    from: "Cape Town CBD",
    to: "Khayelitsha",
    fare: "R18 - R25",
    duration: "60 min",
    frequency: "Every 8 min",
    rating: 4.0,
    passengers: "14-16"
  },
  {
    from: "Durban CBD",
    to: "Umlazi",
    fare: "R10 - R15",
    duration: "35 min",
    frequency: "Every 6 min",
    rating: 4.3,
    passengers: "12-16"
  }
];

export default function Routes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Live Location & Routes
            </h1>
            <p className="text-muted-foreground">
              Find your way with real-time location tracking and route planning
            </p>
          </div>

          {/* Live Map */}
          <div className="mb-8">
            <LiveLocationMap />
          </div>

          {/* Popular Routes */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Popular Routes</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {popularRoutes.map((route, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-medium transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{route.from}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Navigation className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{route.to}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        <span className="text-sm font-medium">{route.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">{route.fare}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-sm text-muted-foreground">{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">{route.passengers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{route.frequency}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        Active Route
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="border-border/50 bg-gradient-secondary/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can't find your route?
              </h3>
              <p className="text-muted-foreground mb-4">
                Help us improve by suggesting new routes and sharing fare information
              </p>
              <Button variant="outline" className="border-secondary/20 hover:bg-secondary/5">
                Suggest Route
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}