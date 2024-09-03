import { LoginFormFields } from "../components/Forms/LoginForm";
import { SignUpFormFields } from "../components/Forms/SignupForm";

import axios from "axios";

const requestServerAction = {
  login: async (formData: LoginFormFields, URL: string) => {
    const response = await axios.post(URL, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    return response;
  },

  signup: async (formData: SignUpFormFields, URL: string) => {
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    return response;
  },

  getUserDetails: async (URL: string) => {
    const response = await axios.post(
      URL,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    return response;
  },
};

export default requestServerAction;
