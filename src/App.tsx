import "./App.css";
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

  const joinroom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:8082/chat")
        .configureLogging(LogLevel.Information)
        .build();

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
      console.log(connectionn);
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
        <ChatPage
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
          users={users}
        />
      ) : (
        <Home joinroom={joinroom} />
      )}
      {/* <Routes>
        <Route path="/" element={<Home joinroom={joinroom} />}></Route>
        <Route path="/chat" element={<ChatPage messages={messages} />}></Route>
      </Routes> */}
    </>
  );
}

export default App;
