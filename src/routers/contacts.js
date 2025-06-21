import { Router } from 'express';
import {
  getContactByIdController,
  getContactController,
  addContactController,
  patchContactByIdController,
  deleteContactByIdController,
} from '../controllers/contactsControllers.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { contactAddSchema } from '../validation/contactSchemas.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactByIdController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
