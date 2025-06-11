import { getContactById, getContacts } from '../services/contacts.js';
import { Router } from 'express';

const contactsRouter = Router();

contactsRouter.get('/', async (req, res) => {
  const contactsData = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contactsData,
  });
});

contactsRouter.get('/:contactId', async (req, res) => {
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

export default contactsRouter;
