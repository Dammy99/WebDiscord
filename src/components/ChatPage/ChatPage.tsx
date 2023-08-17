import styles from "./ChatPage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { User } from "../../App";

interface Messages {
  user: string;
  message: string;
}

interface Props {
  messages: Messages[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => Promise<void>;
  users: User[];
}

const ChatApp = ({ messages, sendMessage, closeConnection, users }: Props) => {
  const [message, setMessage] = useState<string>("");
  // console.log(messageRef);
  // useEffect(() => {
  //   if (messageRef && messageRef.current) {
  //     const { scrollHeight, clientHeigth } = messageRef.current;
  //     messageRef.current?.scrollTo({
  //       left: 0,
  //       top: scrollHeight - clientHeigth,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [messages]);

  return (
    <div className={styles.page}>
      <Sidebar users={users} />
      <section className={styles.body}>
        <div>
          <button
            className={styles.leave}
            color="red"
            onClick={() => closeConnection()}
          >
            Leave room
          </button>
        </div>
        <div className={styles.chat}>
          <div className={styles.content}>
            {messages.map((m, index: number) => (
              <div key={index} className={styles.sms}>
                <div className={styles.message}>{m.message}</div>
                <div className={styles.from}>{m.user}</div>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
            setMessage("");
          }}
          className={styles.message}
        >
          <textarea
            className={styles.input}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <button type="submit">Кнопка</button>
        </form>
      </section>
    </div>
  );
};

export default ChatApp;
