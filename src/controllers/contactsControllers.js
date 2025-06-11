import { getContactById, getContacts } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactController = async (req, res) => {
  const contactsData = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contactsData,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contactData = await getContactById(contactId);

  if (!contactData) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    contactData,
  });
};
