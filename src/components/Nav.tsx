import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>Logo Here</div>

      <ul className={styles["navbar-items-list"]}>
        <li>
          <button className={styles["navbar-buttons"]}>Login</button>
        </li>
        <li>
          <button className={styles["navbar-buttons"]}>Sign Up</button>
        </li>
      </ul>
    </nav>
  );
}
