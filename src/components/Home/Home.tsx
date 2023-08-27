import { useState } from "react";
import styles from "./Home.module.css";
import { useAppSelector } from "../../config/hooks";
import { selectPeer } from "../../Slices/peerSlice";
import { selectUserId } from "../../Slices/userIdSlice";
interface Props {
  joinroom: (user: string, room: string) => Promise<void>;
}

const Home = ({ joinroom }: Props) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const userPeer = useAppSelector(selectPeer);
  const userId = useAppSelector(selectUserId);
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
      <button
        type="button"
        onClick={() => {
          console.log(userPeer);
          console.log(userId);
        }}
      >
        qweqwe
      </button>
    </form>
  );
};

export default Home;
