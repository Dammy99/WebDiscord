import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.text}>Connected Users</div>
      <div className={styles.users}>
        <p className={styles.user}>Max</p>
        <p className={styles.user}>Viktor</p>
      </div>
    </section>
  );
};

export default Sidebar;
