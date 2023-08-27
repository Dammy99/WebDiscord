import styles from "./ChatPage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { User } from "../../App";
import CallChat from "../CallChat/CallChat";
import { HubConnection } from "@microsoft/signalr";
// import { HubConnection } from "@microsoft/signalr";

interface Messages {
  user: string;
  message: string;
}

interface Props {
  messages: Messages[];
  sendMessage: (message: string) => Promise<void>;
  closeConnection: () => Promise<void>;
  users: User[];
  connectionHubInvoke: HubConnection | undefined;
  currentUser: User;
}

const ChatApp = ({
  messages,
  sendMessage,
  closeConnection,
  users,
  connectionHubInvoke,
  currentUser,
}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isCall, setIsCall] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [componentInstance, setComponentInstance] = useState<any>();

  const addNewComponent = () => {
    setComponentInstance(
      <CallChat
        connectionHubInvoke={connectionHubInvoke}
        setIsCall={setIsCall}
        currentUser={currentUser}
      />
    );
  };

  useEffect(() => {
    if (!isCall) {
      addNewComponent();
    }
  }, [isCall]);
  return (
    <div className={styles.page}>
      {isCall && componentInstance}
      <Sidebar users={users} />
      <section className={styles.body}>
        <div>
          <button
            className={styles.leave}
            onClick={() => {
              setIsCall(!isCall);
            }}
            color="red"
          >
            Дзвінок в групі
          </button>
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
