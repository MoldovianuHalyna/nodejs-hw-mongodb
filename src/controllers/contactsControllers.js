import {
  getContactById,
  getContacts,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/Contact.js';

export const getContactController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, contactsSortFields);

  const data = await getContacts({ page, perPage, sortBy, sortOrder });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
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

export const addContactController = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    result,
  });
};
export const patchContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContactById(contactId, req.body);
  if (!result) throw createHttpError(404, 'Contact not found');
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const result = await deleteContactById(contactId);

  if (!result) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 204,
  });
};
