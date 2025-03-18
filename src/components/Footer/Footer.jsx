import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>© 2025 Super App. All rights reserved</p>
    </footer>
  );
};