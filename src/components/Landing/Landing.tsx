import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <>
      <section className={styles["landing-container"]}>
        <div>
          <h1> TAGLINE HERE </h1>
          <h2>Something about the project goes here</h2>
        </div>

        <div>
          <div>Picture here</div>
          <div>Picture here</div>
        </div>
      </section>
    </>
  );
}
