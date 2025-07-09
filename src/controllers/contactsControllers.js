import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  getContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/Contact.js';
import { parseContactFilters } from '../utils/filters/parseContactFilters.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, contactsSortFields);
  const filters = parseContactFilters(req.query);

  filters.userId = userId;
  const data = await getContacts({ page, perPage, sortBy, sortOrder, filters });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contactData = await getContact({ _id: contactId, userId });

  if (!contactData) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    contactData,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    result,
  });
};

export const patchContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateContact(
    { _id: contactId, userId },
    { ...req.body, photo: photoUrl },
  ); ///check if it's correct

  if (!result) throw createHttpError(404, 'Contact not found');
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const result = await deleteContact({ _id: contactId, userId });

  if (!result) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 204,
  });
};
