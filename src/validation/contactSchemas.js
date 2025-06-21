import Joi from 'joi';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'The name field is required',
    'string.base': 'Name must be a string',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Phone number is required field',
  }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': "Contact type must be one of: 'work', 'home', 'personal'",
  }),
});
