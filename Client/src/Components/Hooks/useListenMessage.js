import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import { useConversion } from "../Zustand/useConversation";
import music from "../../../public/sound.wav";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversion();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(music);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessage;
