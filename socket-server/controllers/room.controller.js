import { roomService } from '../services/room.service.js';

export const createRoom = async (req, res) => {
  const { roomName } = req.body;
  console.log(req.body);
  const roomId = crypto.randomUUID();
  
  roomService.createRoom(roomId);
  res.json({ success: true, roomId });
};

export const getRoom = async (req, res) => {
  const { roomId } = req.params;
  const code = roomService.getRoomCode(roomId);
  
  if (!code) return res.status(404).json({ error: 'Sala no encontrada' });
  res.json({ code });
};
