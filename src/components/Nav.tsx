export default function Nav() {
  return (
    <nav className="navbar">
      <div className="navbar-item-container" id="logo-image-container">
        <div className="navbar-item logo" id="logo-image">
          Logo Here
        </div>
      </div>

      <ul className="navbar-items-list">
        <li className="navbar-item button" id="login-button">
          <button>Login</button>
        </li>
        <li className="navbar-item button" id="signup-button">
          <button>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
}
