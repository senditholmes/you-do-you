import { FormFields } from "../components/Forms/SignupForm";

const requestServerToInsert = async (
  userToValidate: FormFields,
  URL: string
) => {
  const apiRes = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToValidate),
  });

  return apiRes;
};

export default requestServerToInsert;
