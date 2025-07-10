import { Router } from 'express';

import {
  loginController,
  registerController,
  refreshController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import {
  loginSchema,
  registerSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/authSchemas.js';

const authRouter = Router();
authRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to authentification page' });
});

authRouter.get('/register', (req, res) => {
  res.json({ message: 'Welcome to register page' });
});

authRouter.get('/login', (req, res) => {
  res.json({ message: 'Welcome to login page' });
});

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);
authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
