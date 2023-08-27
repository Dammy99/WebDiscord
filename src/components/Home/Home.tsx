import { useState } from "react";
import styles from "./Home.module.css";
import { User } from "../../App";
interface Props {
  joinroom: (user: string, room: string) => Promise<void>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Home = ({ joinroom, setCurrentUser }: Props) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const handleSetUser = () => {
    setCurrentUser({ user, room });
  };

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
      <button
        onClick={() => handleSetUser()}
        type="submit"
        disabled={!user || !room}
      >
        Join
      </button>
    </form>
  );
};

export default Home;
