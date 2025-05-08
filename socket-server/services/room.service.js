export class RoomService {
    constructor() {
      this.rooms = new Map(); // { roomId: { code: string, users: number } }
    }
  
    createRoom(roomId) {
      this.rooms.set(roomId, { code: '', users: 0 });
    }
  
    getRoomCode(roomId) {
      return this.rooms.get(roomId)?.code || '';
    }
  
    updateRoomCode(roomId, code) {
      if (this.rooms.has(roomId)) {
        const room = this.rooms.get(roomId);
        room.code = code;
      }
    }
  }
  
  export const roomService = new RoomService();
  