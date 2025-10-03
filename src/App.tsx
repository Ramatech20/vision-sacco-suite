import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { PrivateRoute } from "@/lib/PrivateRoute";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Loans from "./pages/Loans";
import Savings from "./pages/Savings";
import Members from "./pages/Members";
import Contributors from "./pages/Contributors";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import Profile from "./pages/Profile";
import Transfer from "./pages/Transfer";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/loans" element={<PrivateRoute><Loans /></PrivateRoute>} />
            <Route path="/savings" element={<PrivateRoute><Savings /></PrivateRoute>} />
            <Route path="/members" element={<PrivateRoute requireStaff><Members /></PrivateRoute>} />
            <Route path="/contributors" element={<PrivateRoute><Contributors /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute requireStaff><Analytics /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute requireStaff><Reports /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute requireAdmin><Settings /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute requireAdmin><Admin /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/transfer" element={<PrivateRoute requireStaff><Transfer /></PrivateRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
