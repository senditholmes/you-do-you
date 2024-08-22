import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Nav from "./components/Nav/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
          <Nav />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
