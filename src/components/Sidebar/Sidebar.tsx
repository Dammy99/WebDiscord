// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import styles from "./Sidebar.module.css";

const Sidebar = ({ users }) => {
  return (
    <section className={styles.sidebar}>
      <div className={styles.text}>Connected Users</div>
      <div className={styles.users}>
        {typeof users == typeof {} &&
          users.map((user: string, index: number) => (
            <p className={styles.user} key={index}>
              {user}
            </p>
          ))}
      </div>
    </section>
  );
};

export default Sidebar;
