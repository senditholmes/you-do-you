import { FormFields } from "../components/SignupForm/SignupForm";

const addUserToDatabase = async (userToValidate: FormFields, URL: string) => {
  const apiRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToValidate),
  });
  const test = await apiRes.json();
  console.log(test);
};

export default addUserToDatabase;
