import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/room.routes.js';
import { config } from './config/index.js';

export const app = express();

// Middlewares
app.use(cors({ origin: [config.CORS_ORIGIN, "http://localhost:5173"] }));
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api', router);

// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
