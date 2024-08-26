import { LoginFormFields } from "../components/Forms/LoginForm";
import { SignUpFormFields } from "../components/Forms/SignupForm";

import axios from "axios";

const requestServerAction = async (
  formData: SignUpFormFields | LoginFormFields,
  URL: string
) => {
  const response = await axios.post(URL, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export { requestServerAction };
