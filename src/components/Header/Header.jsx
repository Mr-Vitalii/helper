import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Super App</h1>
    </header>
  );
};

