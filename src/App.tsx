import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Reflection from "./pages/Reflection";
import Roadmap from "./pages/Roadmap";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Splash />} />

  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/welcome" element={<Welcome />} />

  <Route
    path="/onboarding"
    element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    }
  />

  <Route
    path="/reflection"
    element={
      <ProtectedRoute>
        <Reflection />
      </ProtectedRoute>
    }
  />

  <Route
    path="/roadmap"
    element={
      <ProtectedRoute>
        <Roadmap />
      </ProtectedRoute>
    }
  />

  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route
    path="/learning"
    element={
      <ProtectedRoute>
        <Learning />
      </ProtectedRoute>
    }
  />

  <Route
    path="/practice"
    element={
      <ProtectedRoute>
        <Practice />
      </ProtectedRoute>
    }
  />

  <Route path="/profile" element={<ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
