
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DoctorBooking from "./pages/DoctorBooking";
import SymptomChecker from "./pages/SymptomChecker";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import AudioTips from "./pages/audioTips";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<DoctorBooking />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/volunteer" element={<VolunteerDashboard />} />
              <Route path="/prescription" element={<PrescriptionUpload />} />
              <Route path="/tips" element={<AudioTips />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
