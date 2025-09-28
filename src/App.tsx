import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { EmergencyButton } from "@/components/EmergencyButton";
import Home from "./pages/Home";
import RoutesPage from "./pages/Routes";
import Alerts from "./pages/Alerts";
import TrainAI from "./pages/TrainAI";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, signOut } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update legacy authentication state for compatibility
  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignOut = async () => {
    await signOut();
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navigation 
        isAuthenticated={!!user || isAuthenticated}
        onSignIn={() => window.location.href = '/auth'}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/train-ai" element={<TrainAI />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth" element={<Auth onAuthenticate={handleSignIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Emergency Button - only show for authenticated users */}
      {(user || isAuthenticated) && <EmergencyButton />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;