import styles from "./FooterUI.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FooterUI() {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <blockquote className={styles.containerInfo}>
          <div className={styles.containerIcon}>
            <div className={styles.icon}>
              <a
                href="https://www.linkedin.com/in/marco-caiazza-8898a3266/"
                target="blank"
              >
                <img src="/linkedin.png" alt="LinkedIn" />
              </a>
            </div>

            <div className={styles.icon}>
              <a href="https://github.com/MarcoCaiazza" target="blank">
                <img src="/github.png" alt="Github" />
              </a>
            </div>
          </div>

          <div className={styles.containerContact}>
            <p>
              <strong>Contact Us</strong>
            </p>

            <div className={styles.iconContact}>
              <img src="/mail.png" alt="Github" />
              <p>marcocaiazza2@gmail.com</p>
            </div>

            <div className={styles.iconContact}>
              <img src="/telefono.png" alt="Github" />
              <p>3405664073</p>
            </div>

            <div className={styles.iconContact}>
              <img src="/home-indirizzo.png" alt="Github" />
              <p>Roma, IT</p>
            </div>
          </div>
          {/* <footer className="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer> */}
        </blockquote>
      </div>
      <div className={styles.copyright}>
        Copyright ©2024 | Designed by Marco Caiazza
      </div>
    </div>
  );
}
