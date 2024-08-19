import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import LoginForm from "./components/LoginSignupForms/LoginForm";
import SignupForm from "./components/LoginSignupForms/SignupForm";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
