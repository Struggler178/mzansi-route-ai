import { ChatInterface } from "@/components/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Lightbulb, Shield, Route } from "lucide-react";

const chatTips = [
  {
    icon: Route,
    title: "Ask About Routes",
    description: "\"Where's the nearest taxi to Sandton?\""
  },
  {
    icon: Shield,
    title: "Safety Information",
    description: "\"Are there any unsafe routes today?\""
  },
  {
    icon: Lightbulb,
    title: "Get Fare Estimates",
    description: "\"How much to get to the airport?\""
  }
];

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Transport Assistant
            </h1>
            <p className="text-muted-foreground">
              Ask me anything about taxi routes, fares, and safety in South Africa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-[600px]">
                <CardContent className="p-0 h-full">
                  <ChatInterface />
                </CardContent>
              </Card>
            </div>

            {/* Tips Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    How to Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chatTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary/10">
                        <tip.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{tip.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Status Card */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">AI Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Training Progress</span>
                      <span className="text-sm font-medium text-foreground">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-warm h-2 rounded-full w-[85%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Our AI is learning from community input to provide better responses
                    </p>
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