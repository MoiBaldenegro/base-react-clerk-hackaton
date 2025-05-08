// import { Server } from 'socket.io';
// import { roomService } from './room.service.js';
// import { config } from '../config/index.js'; 

// class SocketService {
//   constructor() {
//     this.io = null;
//   }

//   init(server) {
//     this.io = new Server(server, {
//       cors: {
//         origin: config.CORS_ORIGIN,
//         methods: ['GET', 'POST']
//       }
//     });

//     this.setupEvents();
//   }

//   setupEvents() {
//     this.io.on('connection', (socket) => {
//       socket.on('joinRoom', ({ roomId }) => {
//         socket.join(roomId);
//         const code = roomService.getRoomCode(roomId);
//         socket.emit('codeUpdate', code);
//       });

//       socket.on('codeUpdate', ({ roomId, code }) => {
//         roomService.updateRoomCode(roomId, code);
//         socket.to(roomId).emit('codeUpdate', code);
//       });

//       socket.on('disconnect', () => {
//         // Lógica de desconexión si es necesaria
//       });
//     });
//   }
// }

// export const socketService = new SocketService();

import { Server } from "socket.io";
import { roomService } from "./room.service.js";
import { config } from "../config/index.js";

class SocketService {
  constructor() {
    this.io = null;
    this.usersByRoom = new Map(); // roomId => Set de usuarios
  }

  init(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.CORS_ORIGIN,
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      socket.on("joinRoom", ({ roomId }) => {
        socket.join(roomId);

        // Añadir usuario a la sala
        if (!this.usersByRoom.has(roomId)) {
          this.usersByRoom.set(roomId, new Set());
        }
        this.usersByRoom.get(roomId).add(socket.id);

        // Enviar código actual
        const code = roomService.getRoomCode(roomId);
        socket.emit("codeUpdate", code);

        // Emitir lista actualizada de usuarios
        this.emitUsersUpdate(roomId);
      });

      socket.on("codeUpdate", ({ roomId, code }) => {
        roomService.updateRoomCode(roomId, code);
        socket.to(roomId).emit("codeUpdate", code);
      });

      socket.on("disconnect", () => {
        // Remover usuario de todas las salas
        for (const [roomId, users] of this.usersByRoom.entries()) {
          if (users.has(socket.id)) {
            users.delete(socket.id);
            this.emitUsersUpdate(roomId);
          }
        }
      });
    });
  }

  emitUsersUpdate(roomId) {
    const users = Array.from(this.usersByRoom.get(roomId) || []).map((id) => ({
      id,
      name: null, // Aquí podrías agregar lógica para nombres de usuario
    }));
    this.io.to(roomId).emit("usersUpdate", users);
  }
}

export const socketService = new SocketService();

