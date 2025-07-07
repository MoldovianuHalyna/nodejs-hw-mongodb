import Joi from 'joi';
import { emailRegexp } from '../constants/auth-constants.js';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'The name field is required',
    'string.base': 'Name must be a string',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'The e-mail field is required',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'any.required': 'The password field is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'any.required': 'The e-mail field is required',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'any.required': 'The password field is required',
  }),
});
