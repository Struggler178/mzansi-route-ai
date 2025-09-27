import { AlertCard } from "@/components/AlertCard";
import { ChatInterface } from "@/components/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Clock,
  ArrowRight,
  MapPin,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-taxi.jpg";

const recentAlerts = [
  {
    type: "strike" as const,
    title: "Taxi Strike in Johannesburg",
    description: "Several routes affected in CBD area. Use alternative routes via Braamfontein.",
    location: "Johannesburg CBD",
    time: "2 hours ago",
    severity: "high" as const
  },
  {
    type: "closure" as const,
    title: "M1 Highway Maintenance",
    description: "Temporary closure between Grayston and Sandton. Delays expected.",
    location: "M1 Highway",
    time: "4 hours ago",
    severity: "medium" as const
  },
  {
    type: "route" as const,
    title: "New Route Available",
    description: "Express service now available from Soweto to Sandton during peak hours.",
    location: "Soweto - Sandton",
    time: "1 day ago",
    severity: "low" as const
  }
];

const stats = [
  { icon: Users, label: "Active Users", value: "15,000+", trend: "+12%" },
  { icon: MapPin, label: "Routes Covered", value: "500+", trend: "+8%" },
  { icon: Shield, label: "Safety Rating", value: "4.8/5", trend: "+0.2" },
  { icon: Clock, label: "Avg Response", value: "< 2min", trend: "-15%" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="South African taxi" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Transport Assistant
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Smart Taxi Travel
              <span className="block text-transparent bg-gradient-warm bg-clip-text">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get real-time routes, fares, and safety information for South African taxis. 
              Travel smarter, safer, and with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-warm hover:shadow-glow transition-all duration-300">
                Start Chatting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                View Routes
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-medium transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-primary/10">
                          <stat.icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs text-success border-success/20">
                        {stat.trend}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Alerts */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Recent Alerts & Updates
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <AlertCard key={index} {...alert} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Interface */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Try Our AI Assistant</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Routes
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Safety Tips
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Live Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}