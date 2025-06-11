import { Router } from 'express';
import {
  getContactByIdController,
  getContactController,
} from '../controllers/contactsControllers.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

export default contactsRouter;
