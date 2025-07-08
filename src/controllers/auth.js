import { registerUser, loginUser, refreshUser } from '../services/auth.js';

import { refreshTokenLifetime } from '../constants/auth-constants.js';

const setupSession = (res, { refreshToken }) => {
  res.cookie('refreshToken', refreshToken, {
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
