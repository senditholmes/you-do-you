import Nav from "../components/Nav";
import GetUserDetailsButton from "../components/GetUserDetailsButton";
import getUserDetails from "../helpers/getUserDetails";

export default function Home() {
  return (
    <>
      <Nav />
      <GetUserDetailsButton getUserDetails={getUserDetails} />
    </>
  );
}
