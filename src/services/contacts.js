import ContactCollection from '../db/models/Contact.js';

export const getContacts = ({ page = 1, perPage = 10 }) => {
  const skip = (page - 1) * perPage;

  return ContactCollection.find().skip(skip).limit(perPage);
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContactById = async (id, payload, options = {}) => {
  const result = await ContactCollection.findByIdAndUpdate(id, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    isNew,
    data: result?.value,
  };
};

export const deleteContactById = (id) =>
  ContactCollection.findByIdAndDelete(id);
