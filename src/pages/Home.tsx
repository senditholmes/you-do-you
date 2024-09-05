import { useEffect } from "react";
import requestServerAction from "../api/API";
import Nav from "../components/Nav";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

async function getUserDetails(e: any) {
  e.preventDefault();
  const response = await requestServerAction.getUserDetails(
    "http://localhost:3000/user/getUser"
  );
  return response;
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAutoLogin = async () => {
      try {
        const autoLoginResponse = await requestServerAction.autoLogin(
          "http://localhost:3000/auth/autologin"
        );

        if (autoLoginResponse.data.success) {
          toast.success(autoLoginResponse.data.message);
        }
      } catch (err: any) {
        toast.error("Session expired, please login again.");
        navigate("/login");
      }
    };
    completeAutoLogin();
  }, [navigate]);

  return (
    <>
      <Nav />

      <button type="submit" onClick={getUserDetails}>
        Get your details bro.
      </button>

      <section>
        <div></div>
      </section>
    </>
  );
}
