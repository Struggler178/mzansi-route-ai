import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  "Where's the nearest taxi to Sandton?",
  "How much does it cost to get to Soweto?",
  "Are there any strikes today?",
  "Safe routes to the airport?"
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Sawubona! 👋 I'm your AI transport assistant. Ask me about taxi routes, fares, or safety information. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "I understand you're looking for transport information. Currently, I'm in training mode - our team is working hard to connect me with real-time taxi data. Soon I'll be able to help you with live routes, fares, and safety updates! 🚐✨",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-card rounded-2xl shadow-medium border border-border/50">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-gradient-warm rounded-t-2xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-primary-foreground">AI Transport Assistant</h2>
          <p className="text-sm text-primary-foreground/80">Ask me anything about taxis</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                message.type === "user" 
                  ? "bg-gradient-accent text-accent-foreground" 
                  : "bg-gradient-secondary text-secondary-foreground"
              }`}>
                {message.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div className={`max-w-[70%] ${message.type === "user" ? "text-right" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm ${
                    message.type === "user"
                      ? "bg-gradient-accent text-accent-foreground ml-auto"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-secondary text-secondary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      <div className="p-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-8 rounded-full"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-b-2xl">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about routes, fares, or safety..."
          className="border-0 bg-background/50 focus-visible:ring-primary"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button 
          onClick={handleSendMessage}
          size="icon"
          className="bg-gradient-warm hover:shadow-medium transition-all duration-200"
          disabled={!inputValue.trim() || isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}