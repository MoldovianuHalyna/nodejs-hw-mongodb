import { Router } from 'express';
import {
  getContactByIdController,
  getContactController,
} from '../controllers/contactsControllers.js';

const contactsRouter = Router();

contactsRouter.get('/', getContactController);

contactsRouter.get('/:contactId', getContactByIdController);

export default contactsRouter;
