import React from "react";
import styles from "./ChatPage.module.css";
import Sidebar from "../Sidebar/Sidebar";

const ChatApp: React.FC = () => {
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState<string[]>([]);

  // const handleSendMessage = () => {
  //   if (message.trim() !== "") {
  //     setMessages([...messages, message]);
  //     setMessage("");
  //   }
  // };

  return (
    <div className={styles.page}>
      <Sidebar />
      <section className={styles.body}>
        <div className={styles.chat}>
          <div className={styles.content}>
            <div>SMS</div>
            <div>SMS</div>
            <div>SMS</div>
          </div>
        </div>
        <div className={styles.message}>
          <textarea className={styles.input}></textarea>
          <button>Кнопка</button>
        </div>
      </section>
    </div>
  );
};

export default ChatApp;
