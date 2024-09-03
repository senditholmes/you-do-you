import requestServerAction from "../api/API";

export default async function getUserDetails(e: any) {
  e.preventDefault();
  const response = await requestServerAction.getUserDetails(
    "http://localhost:3000/user/getUser"
  );

  return response;
}
