import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-between border bg-gray-200 mb-10 p-1">
      <div className="flex items-center ml-5">
        <Link to="/">
          <p className="text-lg font-bold">You-Do-You</p>
        </Link>
      </div>

      <ul className="flex justify-around">
        <li className="text-lg">
          <button className="p-5">
            <Link to="login">Login</Link>
          </button>
        </li>
        <li className="text-lg">
          <button className="p-5">
            <Link to="signup">Sign Up</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}
