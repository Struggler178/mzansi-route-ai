import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Sawubona! 👋 I'm your ZakaWise AI assistant. I'm here to help you understand money and finances in simple terms. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What is a credit score?",
    "How do I start saving money?",
    "What is stokvel investing?",
    "How do I create a budget?",
    "What's the difference between debit and credit cards?",
    "How can I avoid bank fees?",
    "What is compound interest?",
    "How do I build an emergency fund?"
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('credit score')) {
      return "A credit score is like a report card for how well you handle money! 📊 In South Africa, it ranges from 0-999. Banks use it to decide if they'll lend you money. To improve it: pay bills on time, don't use all your credit, and check your credit report regularly. A good score (670+) helps you get loans with better interest rates!";
    }
    
    if (lowerMessage.includes('saving') || lowerMessage.includes('save')) {
      return "Great question! 💰 Start small with the 50/30/20 rule: 50% for needs (rent, food), 30% for wants (entertainment), 20% for savings. Even R50/month helps! Open a savings account, set up automatic transfers, and try the '52-week challenge' - save R10 week 1, R20 week 2, etc. You'll have R13,780 by year-end!";
    }
    
    if (lowerMessage.includes('stokvel')) {
      return "Stokvels are amazing! 🤝 It's when friends/family pool money together for saving or investing. Popular types: savings stokvels (everyone saves monthly, takes turns getting the pot), grocery stokvels (buy food in bulk for cheaper prices), and investment stokvels (invest in shares/property together). Just make sure you trust the group and have clear rules!";
    }
    
    if (lowerMessage.includes('budget')) {
      return "Budgeting is your money roadmap! 🗺️ List your monthly income, then your expenses (rent, food, transport, etc.). The goal: income > expenses. Use the ZakaWise Budget Planner to see where your money goes. Pro tip: Track spending for a week first to see your real patterns. Small leaks sink big ships!";
    }
    
    if (lowerMessage.includes('debit') || lowerMessage.includes('credit card')) {
      return "Easy explanation! 💳 Debit card = uses YOUR money from your bank account immediately. Credit card = uses the BANK's money, you pay back later (with interest if late). Debit is safer for beginners - you can't spend money you don't have. In SA, avoid store cards with high interest rates (20%+)!";
    }
    
    if (lowerMessage.includes('bank fees') || lowerMessage.includes('fees')) {
      return "Bank fees can eat your money! 💸 Tips to avoid them: Use your own bank's ATMs, bank online instead of in branches, maintain minimum balances, consolidate accounts, and compare banks - Capitec and TymeBank often have lower fees. Check your statements monthly and query unfamiliar charges!";
    }
    
    if (lowerMessage.includes('compound interest')) {
      return "This is money magic! ✨ Compound interest means earning interest on your interest. Example: Save R1000 at 8% interest. Year 1: R1080. Year 2: R1166 (interest on the R80 too!). Over 20 years, you'd have R4,661 from that R1000. Start early - time is your best friend with compound interest!";
    }
    
    if (lowerMessage.includes('emergency fund')) {
      return "Your financial safety net! 🛡️ Aim for 3-6 months of expenses saved for emergencies (job loss, medical bills, car repairs). Start with R1000, then build up. Keep it in a separate, easily accessible savings account. Pro tip: Save your tax refund, bonuses, or any unexpected money directly into this fund!";
    }
    
    // Default responses for general queries
    const responses = [
      "That's a great question! 🤔 Financial literacy is a journey, and every question helps you grow. Can you be more specific about what you'd like to know?",
      "I love helping with money questions! 💡 Could you tell me more about your specific situation so I can give you better advice?",
      "Smart thinking! 🧠 Understanding your finances is the first step to financial freedom. What aspect interests you most?",
      "Excellent question! 📚 Money management is all about building good habits. What would you like to focus on first?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuestionClick = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 rounded-t-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Transport Assistant</h1>
            <p className="text-primary-foreground/80">Ask me anything about taxi routes, fares, and safety in South Africa!</p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="p-6 bg-muted/30">
          <h3 className="font-semibold mb-4 text-muted-foreground">💡 Popular Questions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="text-left p-3 rounded-lg bg-card hover:bg-primary/5 border border-border hover:border-primary/20 transition-colors text-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            <div className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString('en-ZA', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="chat-bubble chat-bubble-ai">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-card border-t border-border">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about budgeting, saving, investing..."
            className="flex-1 px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;