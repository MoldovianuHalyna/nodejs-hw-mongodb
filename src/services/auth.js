import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

import {
  refreshTokenLifetime,
  accessTokenLifetime,
} from '../constants/auth-constants.js';

import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
dotenv.config();

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifetime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
});

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => UserCollection.findOne(query);

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });

  if (user) throw createHttpError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password is invalid');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare)
    throw createHttpError(401, 'Email or password is invalid');

  const session = createSession();

  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken }) => {
  const oldSession = await findSession({ refreshToken });

  if (!oldSession) throw createHttpError(401, 'Session not found');
  if (oldSession.refreshTokenValidUntil < Date.now())
    throw createHttpError(401, 'Session token expired');

  await SessionCollection.findOneAndDelete({ _id: oldSession._id });
  const session = createSession();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...session,
  });
};

export const logoutUser = async (_id) => {
  await SessionCollection.findByIdAndDelete({ _id });
};

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: getEnvVar(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.error('Email send failed:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
