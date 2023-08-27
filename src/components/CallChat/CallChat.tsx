import { RefObject, useEffect, useRef, useState } from "react";
import styles from "./CallChat.module.css";
import { HubConnection } from "@microsoft/signalr";
import Peer from "peerjs";

interface ICallProps {
  connectionHubInvoke: HubConnection | undefined;
  setIsCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const CallChat = ({ connectionHubInvoke, setIsCall }: ICallProps) => {
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [newLocalStream, setNewLocalStream] = useState<MediaStream>();
  let localStream: MediaStream;
  const divchik: RefObject<HTMLDivElement> = useRef(null);
  const room = "123";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Peers: any = {};
  let user = "";

  const myPeer: Peer = new Peer();

  useEffect(() => {
    myPeer.on("open", (id) => {
      user = id;
      console.log(id);
    });
  }, []);

  myPeer.on("call", (call) => {
    call.answer(localStream);

    const userVideo = document.createElement("video");
    userVideo.id = "userVideo";
    call.on("stream", (userVideoStream) => {
      addVideoStream(userVideo, userVideoStream);
    });

    call.on("close", () => {
      userVideo.remove();
      myPeer.disconnect();
    });

    let tempStorageId;

    for (const key in myPeer.connections) {
      tempStorageId = key;
    }
    Peers[tempStorageId!] = call;
  });

  connectionHubInvoke?.on("TurnOnCameraAllCams", (id) => {
    if (user === id) {
      return;
    }
    if (!Peers[id]) {
      if (user !== "") {
        connectNewUser(id, localStream);
      }
    }
  });

  connectionHubInvoke?.on("TurnOffCamera", (id) => {
    if (Peers[id]) {
      Peers[id].close();
      delete Peers[id];
    }
  });

  const myVideo = document.createElement("video");
  myVideo.id = "myVideo";
  myVideo.className = "video";

  const turnOffCamera = async () => {
    await connectionHubInvoke?.invoke("TurnOffLeavedCamera", { user, room });
    newLocalStream!.getTracks().forEach(function (track) {
      track.stop();
    });
    console.log(myPeer.listAllPeers());
    myPeer.disconnect();
    document.getElementById("myVideo")?.remove();
  };

  const turnOnCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 300, height: 180 },
      })
      .then(async (stream) => {
        addVideoStream(myVideo, stream);
        localStream = stream;
        setNewLocalStream(stream);
        await connectionHubInvoke?.invoke("TurnOnCamera", { user, room });
      });
  };

  const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    if (video) {
      divchik.current!.appendChild(video);
    }
  };

  const connectNewUser = (userId: string, localStream: MediaStream) => {
    const userVideo = document.createElement("video");
    userVideo.id = "userVideo";
    userVideo.className = "video";
    const call = myPeer.call(userId, localStream);

    call.on("stream", (userVideoStream) => {
      addVideoStream(userVideo, userVideoStream);
    });

    call.on("close", () => {
      userVideo.remove();
    });

    Peers[userId] = call;
  };

  return (
    <div ref={divchik} className={styles.callChat} id="video-grid">
      {isCameraOff && (
        <button
          className={styles.start}
          onClick={() => {
            turnOnCamera();
            setIsCameraOff(false);
          }}
        >
          Turn on
        </button>
      )}
      <button
        className={styles.back}
        onClick={() => {
          turnOffCamera();
          setIsCall(false);
        }}
      >
        X
      </button>
    </div>
  );
};

export default CallChat;
