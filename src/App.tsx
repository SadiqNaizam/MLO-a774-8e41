import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import dashboard pages
import DashboardOverview from "./pages/DashboardOverview";
import OrderManagementPage from "./pages/OrderManagementPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import AnalyticsReportsPage from "./pages/AnalyticsReportsPage";
import UserProfileSettingsPage from "./pages/UserProfileSettingsPage";

import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect base path to dashboard overview */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/orders" element={<OrderManagementPage />} />
          <Route path="/dashboard/products" element={<ProductManagementPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsReportsPage />} />
          <Route path="/dashboard/settings" element={<UserProfileSettingsPage />} />
          
          {/* Placeholder for a login page route if needed in the future */}
          {/* <Route path="/login" element={<div>Login Page Placeholder</div>} /> */}

          {/* ADD ALL OTHER CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;