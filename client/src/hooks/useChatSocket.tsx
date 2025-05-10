// src/hooks/useChatSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useStore } from "../store/useStore";

export function useChatSocket(roomId) {
  const socketRef = useRef(null);
  const addMessage = useStore((state) => state.addMessage);

  useEffect(() => {
    if (!roomId) return;

    socketRef.current = io("http://localhost:5700");

    socketRef.current.emit("joinRoom", { roomId });

    socketRef.current.on("chatMessage", (msg) => {
      addMessage(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, addMessage]);

  const sendMessage = (text) => {
    socketRef.current.emit("chatMessage", { roomId, text });
  };

  return { sendMessage };
}
