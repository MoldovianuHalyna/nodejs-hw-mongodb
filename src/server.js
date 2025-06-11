import express from 'express';
import cors from 'cors';

import { getContacts, getContactById } from './services/contacts.js';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(logger);

  app.get('/contacts', async (req, res) => {
    const contactsData = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      contactsData,
    });
  });

  app.get('/', (req, res) => {
    res.send('<h1>Contacts main page</h1>');
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contactData = await getContactById(contactId);

    if (!contactData) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      contactData,
    });
  });

  app.use(errorHandler);

  app.get(notFoundHandler);

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => console.log(`Server is running on ${port} port`));
};
