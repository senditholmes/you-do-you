import { LoginFormFields } from "../components/Forms/LoginForm";
import { SignUpFormFields } from "../components/Forms/SignupForm";

const requestServerAction = async (
  formData: SignUpFormFields | LoginFormFields,
  URL: string
  // type: string
) => {
  const apiRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return apiRes;
};

export { requestServerAction };
