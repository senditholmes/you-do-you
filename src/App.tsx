import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing.tsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.tsx";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
