import { Link } from "react-router-dom";
import requestServerAction from "../api/API";

async function handleLogout(e: any) {
  e.preventDefault();
  try {
    const logoutResponse = await requestServerAction.logout(
      "http://localhost:3000/auth/logout"
    );
    console.log(logoutResponse);
  } catch (error) {
    console.log(error);
  }
}

export default function Nav() {
  return (
    <nav className="flex justify-between border bg-gray-300 p-1">
      <div className="flex items-center ml-5">
        <Link to="/">
          <p className="text-lg font-bold">You-Do-You</p>
        </Link>
      </div>

      <ul className="flex justify-around">
        <li className="text-xl">
          <button className="p-5">
            <Link to="/login">Login</Link>
          </button>
        </li>
        <li className="text-xl">
          <button className="p-5">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="p-5" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
