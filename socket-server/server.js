import http from 'http';
import { app } from './app.js';
import { config } from './config/index.js';
import { socketService } from './services/socket.service.js';

const server = http.createServer(app);

// Inicializar WebSocket
socketService.init(server);

server.listen(config.PORT, () => {
  console.log(`Servidor en http://localhost:${config.PORT}`);
});
