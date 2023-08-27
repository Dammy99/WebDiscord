import ChatPage from "./components/ChatPage/ChatPage";
import Home from "./components/Home/Home";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useState } from "react";

interface Message {
  user: string;
  message: string;
}

export interface User {
  user: string;
  room: string;
}

function App() {
  const [connectionn, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7000/chat")
    .configureLogging(LogLevel.Information)
    .build();

  const joinroom = async (user: string, room: string) => {
    try {
      connection.on("ReceiveMessage", (user: string, message: string) => {
        setMessages((messages: Message[]) => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(() => {
        setConnection(undefined);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connectionn!.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connectionn?.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {connectionn ? (
        <div>
          <ChatPage
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
            connectionHubInvoke={connectionn}
          />
        </div>
      ) : (
        <Home joinroom={joinroom} />
      )}
    </>
  );
}

export default App;
