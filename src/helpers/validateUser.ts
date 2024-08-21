import { FormFields } from "../components/LoginSignupForms/SignupForm";

const validateUser = async (userToValidate: FormFields, URL: string) => {
  // POST TO SERVER

  const apiRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type
    },
    body: JSON.stringify(userToValidate), // Convert the data object to a JSON string
  });
  const test = await apiRes.json();
  console.log(test);
};

export default validateUser;
