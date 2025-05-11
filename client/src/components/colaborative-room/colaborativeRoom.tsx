import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./colaborativeRoom.module.css";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export default function CreateRoom() {
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    <div className={styles.colaborativeRoom}>
      <h2>Crear Sala</h2>
      <input
        type="text"
        placeholder="Nombre de la sala"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreate} disabled={loading}>
        {loading ? "Creando..." : "Crear Sala"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
