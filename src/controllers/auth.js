import { registerUser, loginUser } from '../services/auth.js';

import { refreshTokenLifetime } from '../constants/auth-constants.js';

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
  const { accessToken, refreshToken } = await loginUser(req.body);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });
};
