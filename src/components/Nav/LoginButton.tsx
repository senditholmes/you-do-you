import styles from "./LoginButton.module.css";

export default function LoginButton() {
  return (
    <li>
      <button className={styles["navbar-buttons"]}>
        <a href="login">Login</a>
      </button>
    </li>
  );
}
