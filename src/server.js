import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(express.static('public'));
  app.use(logger);

  app.use('/api-docs', swaggerDocs());

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(errorHandler);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.get(notFoundHandler);

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => console.log(`Server is running on ${port} port`));
};
