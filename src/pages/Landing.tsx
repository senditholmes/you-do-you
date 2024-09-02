import { useSelector } from "react-redux";
import Nav from "../components/Nav";

export default function LandingPage() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
      <Nav />
      <section>
        {currentUser
          ? `Welcome to your app ${currentUser.firstName}`
          : "Sign Up to see your page"}
      </section>
    </>
  );
}
