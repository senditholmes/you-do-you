import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>
        <a href="/">Logo Here</a>
      </div>

      <ul className={styles["navbar-items-list"]}>
        <LoginButton />
        <SignUpButton />
      </ul>
    </nav>
  );
}
