import { Schema, model } from 'mongoose';
import { saveErrorHandler } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
contactSchema.post('save', saveErrorHandler);

const ContactCollection = model('Contact', contactSchema);

export default ContactCollection;
