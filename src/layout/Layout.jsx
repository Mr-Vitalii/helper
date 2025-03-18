

import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
    <Header/>
      <main className={styles.content}>{children}</main>
    <Footer/>
    </div>
  );
};

export default Layout;