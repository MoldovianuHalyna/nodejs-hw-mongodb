import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from '../services/auth.js';

import { refreshTokenLifetime } from '../constants/auth-constants.js';
import { resetPassword } from '../services/auth.js';

const setupSession = (res, { _id, refreshToken }) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });
};

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  const userObj = user.toObject();
  delete userObj.password;

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userObj,
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  };

  res.clearCookie('refreshToken', cookieOptions);
  res.clearCookie('sessionId', cookieOptions);

  res.status(204).send();
};

import { requestResetToken } from '../services/auth.js';

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
