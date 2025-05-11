import { makeStyles, tokens, Divider, Button } from "@fluentui/react-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./colaborativeRoom.module.css";
import { CreatePrivateRoom } from "./create-private-room/createprivateRoom";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;



const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
    border: "1px solid #d6d6d666",
    height: "100%",
    padding: "16px",
    borderRadius: "8px"
  },
  example: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const styles = useStyles();


  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${SOCKET_SERVER_URL}/api/rooms`, {
        roomName,
      });
      const { roomId } = res.data;
      navigate(`room/${roomId}`); // Redirige a la sala
    }catch(err) { 
      console.log(err);
      setError("Error creando la sala");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={
      {
        padding: "16px",
        height: "100dvh"
      }
    }>
      <div className={styles.root}>
      <div className={styles.example}>
        <div>
        <CreatePrivateRoom/>
          <Button> Crear sala </Button>
        </div>
        <Divider alignContent="start">start</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center">center (default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end">end</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="start" vertical>
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center" vertical>
          center (default)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end" vertical>
          end
        </Divider>
      </div>
    </div>
    </div>
  );
};

export default CreateRoom;

////////////////////////////////////////////////////////////////////////////////////////



// export default function CreateRoom() {
  

  
//   return (
//     <div className={styles.colaborativeRoom}>
//       <h2>Crear Sala</h2>
//       <input
//         type="text"
//         placeholder="Nombre de la sala"
//         value={roomName}
//         onChange={(e) => setRoomName(e.target.value)}
//       />
//       <button onClick={handleCreate} disabled={loading}>
//         {loading ? "Creando..." : "Crear Sala"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }
