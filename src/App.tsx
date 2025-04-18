
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import Exchanges from "./pages/Exchanges";
import Resources from "./pages/Resources";
import Tokenomics from "./pages/Tokenomics";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogarticlepage" element={<BlogArticlePage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
