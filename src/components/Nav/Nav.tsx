import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-between border bg-gray-200 mb-10">
      <div className="flex items-center ml-5">
        <Link to="/">Logo Here</Link>
      </div>

      <ul className="flex justify-around">
        <li>
          <button className="p-5">
            <Link to="login">Login</Link>
          </button>
        </li>
        <li>
          <button className="p-5">
            <Link to="signup">Sign Up</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}
