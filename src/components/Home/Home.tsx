import { useState } from "react";
import styles from "./Home.module.css";

interface Props {
  joinroom: (user: string, room: string) => Promise<void>;
}

const Home = ({ joinroom }: Props) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        joinroom(user, room);
      }}
      className={styles.home}
    >
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        placeholder="ChatName"
      />
      <button type="submit" disabled={!user || !room}>
        Join
      </button>
    </form>
  );
};

export default Home;
