import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MainCodeWindow from "../core/main-code-window/mainCodeWindow";
import styles from "./example.module.css";
import { useEditorStore } from "../../store/editor.store";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export default function CollaborativeEditor() {
   const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.emit("joinRoom", { roomId });

    socketRef.current.on("codeUpdate", (newCode) => {
      
      isRemoteUpdate.current = true;
      setCode(newCode);
    });

    // Escuchar lista de usuarios conectados
    socketRef.current.on("usersUpdate", (usersList) => {
      setUsers(usersList);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handleEditorChange = (value) => {
    setCode(value);
    if (!isRemoteUpdate.current) {
      socketRef.current.emit("codeUpdate", { roomId, code: value });
    }
    isRemoteUpdate.current = false;
  };
 
  return (
    <div className={styles.container} >
         <MainCodeWindow setCode={(value)=>{
            handleEditorChange(value)
         }} code={code} users={users} />
    </div>
  );
}
