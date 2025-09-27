import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users,
  Send,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentSubmissions = [
  {
    id: 1,
    route: "Randburg → Fourways",
    fare: "R18 - R22",
    status: "verified",
    submittedBy: "Community Member",
    date: "2 days ago"
  },
  {
    id: 2,
    route: "Kempton Park → OR Tambo",
    fare: "R25 - R30",
    status: "pending",
    submittedBy: "TaxiUser94",
    date: "1 day ago"
  },
  {
    id: 3,
    route: "Centurion → Hatfield",
    fare: "R15 - R20",
    status: "verified",
    submittedBy: "Community Member",
    date: "3 hours ago"
  }
];

export default function TrainAI() {
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!routeFrom || !routeTo || !minFare || !maxFare) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Route Submitted! 🎉",
      description: "Thank you for helping improve our AI. Your submission will be reviewed by our team.",
    });

    // Reset form
    setRouteFrom("");
    setRouteTo("");
    setMinFare("");
    setMaxFare("");
    setDuration("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 rounded-full bg-gradient-warm">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Help Train Our AI
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your knowledge about taxi routes and fares to help our AI provide better, 
              more accurate information to the community.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Submission Form */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Submit Route Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Route Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">From *</label>
                      <Input
                        placeholder="e.g., Johannesburg CBD"
                        value={routeFrom}
                        onChange={(e) => setRouteFrom(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">To *</label>
                      <Input
                        placeholder="e.g., Soweto"
                        value={routeTo}
                        onChange={(e) => setRouteTo(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Fare Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Min Fare (R) *</label>
                      <Input
                        type="number"
                        placeholder="15"
                        value={minFare}
                        onChange={(e) => setMinFare(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Max Fare (R) *</label>
                      <Input
                        type="number"
                        placeholder="20"
                        value={maxFare}
                        onChange={(e) => setMaxFare(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Travel Duration (optional)</label>
                    <Input
                      placeholder="e.g., 45 minutes"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Notes (optional)</label>
                    <Textarea
                      placeholder="Share any additional information about this route, safety concerns, or tips..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-background/50 min-h-[80px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-warm hover:shadow-medium transition-all duration-200">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Route Information
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* How it Works */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-primary/10 text-xs font-medium text-primary">
                        1
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Submit route information based on your travel experience
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-primary/10 text-xs font-medium text-primary">
                        2
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our team verifies the information for accuracy
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-primary/10 text-xs font-medium text-primary">
                        3
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Approved data helps train our AI to provide better responses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Submissions */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Community Submissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{submission.route}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-success" />
                            <span className="text-xs text-muted-foreground">{submission.fare}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{submission.date}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={submission.status === "verified" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {submission.status === "verified" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="border-border/50 bg-gradient-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">247</p>
                      <p className="text-sm text-muted-foreground">Routes Submitted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">189</p>
                      <p className="text-sm text-muted-foreground">Verified Routes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}