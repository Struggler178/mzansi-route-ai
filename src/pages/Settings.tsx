import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Shield, 
  Smartphone,
  Mail,
  MapPin,
  Volume2
} from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Customize your TaxiAI experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Notification Settings */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Strike Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about taxi strikes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Route Updates</p>
                      <p className="text-sm text-muted-foreground">New routes and fare changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Safety Alerts</p>
                      <p className="text-sm text-muted-foreground">Important safety information</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Language</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <Badge variant="outline">English 🇿🇦</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Location Services</p>
                      <p className="text-sm text-muted-foreground">Allow location access for better routes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Anonymous Usage</p>
                      <p className="text-sm text-muted-foreground">Help improve the app anonymously</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Data Sharing</p>
                      <p className="text-sm text-muted-foreground">Share data with transport authorities</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-2">Account Actions</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Export Data
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Download Mobile App
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Update Location
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Sound Settings
                  </Button>
                </CardContent>
              </Card>

              {/* App Information */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">App Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Version</span>
                    <span className="text-sm font-medium">1.0.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated</span>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Usage</span>
                    <span className="text-sm font-medium">~2.5 MB</span>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="border-border/50 bg-gradient-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our community is here to support you
                  </p>
                  <Button variant="outline" size="sm" className="border-secondary/20 hover:bg-secondary/5">
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}