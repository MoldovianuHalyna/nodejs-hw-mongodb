import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // app.use(
  //   pinoHttp({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/', (req, res) => {
    res.json({
      message: 'server start',
    });
  });

  app.use((error, req, res, next) => {
    const { status, message } = error;
    res.status(status).json({
      status,
      message,
    });
  });

  app.get((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => console.log(`Server is running on ${port} port`));
};
