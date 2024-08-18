import styles from "./SignUpButton.module.css";

export default function SignUpButton() {
  return (
    <li>
      <button className={styles["navbar-buttons"]}>
        <a href="signup">Sign Up</a>
      </button>
    </li>
  );
}
