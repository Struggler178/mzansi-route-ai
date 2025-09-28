import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, MapPin, DollarSign, Shield, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface LocationData {
  currentLocation: string;
  destination: string;
  coordinates?: { lat: number; lng: number };
}

const suggestions = [
  "Where can I get a taxi to Sandton?",
  "How much from Braamfontein to Soweto?",
  "Is it safe to travel at night?",
  "Show me routes from my location",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Sawubona! 👋 I'm your TaxiConnect assistant with access to real South African taxi routes and training data. Ask me about routes, fares, or safety tips. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationData, setLocationData] = useState<LocationData>({
    currentLocation: "",
    destination: "",
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Get user's current location
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "❌ Geolocation is not supported by your browser. Please enter your location manually.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setIsGettingLocation(true);
    
    const loadingMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: "🌍 Getting your current location...",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Try reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`
        );
        const data = await response.json();
        let address = `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        
        if (data && data.display_name) {
          const addressParts = data.display_name.split(',');
          address = addressParts.slice(0, 3).join(', ').trim();
        }
        
        setLocationData(prev => ({
          ...prev,
          currentLocation: address,
          coordinates: { lat: latitude, lng: longitude }
        }));

        // Replace loading message with success
        setMessages(prev => prev.slice(0, -1).concat([{
          id: Date.now().toString(),
          type: "bot",
          content: `📍 I've detected your location as: ${address}\n\nNow I can provide more accurate route information! What would you like to know?`,
          timestamp: new Date()
        }]));

      } catch (geocodeError) {
        const coords = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setLocationData(prev => ({
          ...prev,
          currentLocation: coords,
          coordinates: { lat: latitude, lng: longitude }
        }));

        setMessages(prev => prev.slice(0, -1).concat([{
          id: Date.now().toString(),
          type: "bot",
          content: `📍 Got your GPS coordinates: ${coords}\n\nI can now provide location-based route advice!`,
          timestamp: new Date()
        }]));
      }

    } catch (error: any) {
      let errorMessage = "Unable to get your location. ";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "Location access was denied. Please enable location services.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Your location is currently unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage += "Location request timed out.";
          break;
        default:
          errorMessage += "Please enter your location manually.";
      }
      
      setMessages(prev => prev.slice(0, -1).concat([{
        id: Date.now().toString(),
        type: "bot",
        content: `❌ ${errorMessage}`,
        timestamp: new Date()
      }]));
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          currentLocation: locationData.currentLocation,
          destination: locationData.destination,
          coordinates: locationData.coordinates
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply || "Sorry, I couldn't process that request. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I'm having trouble connecting to my training data. The backend server might be down. Please check that the server is running on port 3000. 🔄",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto p-4">
      <Card className="flex-1 flex flex-col overflow-hidden shadow-xl">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-secondary to-primary p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold">TaxiConnect Assistant</h2>
                <p className="text-white/80 text-sm">Now with training data & location features</p>
              </div>
            </div>
            <Button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isGettingLocation ? "Getting..." : "My Location"}
            </Button>
          </div>
        </div>

        {/* Location Info Display */}
        {(locationData.currentLocation || locationData.destination) && (
          <div className="px-4 py-2 bg-muted/50 border-b border-border">
            <div className="flex flex-wrap gap-2 text-xs">
              {locationData.currentLocation && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="text-primary">From: {locationData.currentLocation}</span>
                </div>
              )}
              {locationData.destination && (
                <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 rounded-full">
                  <MapPin className="w-3 h-3 text-secondary" />
                  <span className="text-secondary">To: {locationData.destination}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3 chat-bubble-enter",
                  message.type === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    message.type === "bot"
                      ? "bg-gradient-to-br from-secondary to-primary"
                      : "bg-accent"
                  )}
                >
                  {message.type === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-accent-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl p-3 shadow-sm",
                    message.type === "bot"
                      ? "bg-card border border-border"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.type === "bot" ? "text-muted-foreground" : "text-primary-foreground/70"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about routes, fares, or safety..."
              className="flex-1"
            />
            <Button type="submit" variant="gradient" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Feature Pills */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-card rounded-full border border-border text-sm">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">Live Routes</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-card rounded-full border border-border text-sm">
          <DollarSign className="w-3 h-3 text-secondary" />
          <span className="text-muted-foreground">Fair Prices</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-card rounded-full border border-border text-sm">
          <Shield className="w-3 h-3 text-success" />
          <span className="text-muted-foreground">Safe Travel</span>
        </div>
      </div>
    </div>
  );
}