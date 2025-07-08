import ContactCollection from '../db/models/Contact.js';
import { calcaPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find();

  if (filters.userId) {
    query.where('userId').equals(filters.userId);
  }
  if (filters.type) {
    query.where('type').equals(filters.type);
  }
  const totalItems = await ContactCollection.countDocuments(query.getFilter());

  const items = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcaPaginationData({ page, perPage, totalItems });

  return {
    items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContact = (query) => ContactCollection.findOne(query);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (query, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(query, payload, {
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

export const deleteContact = (query) =>
  ContactCollection.findOneAndDelete(query);
