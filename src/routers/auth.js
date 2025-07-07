import { Router } from 'express';

import { loginController, registerController } from '../controllers/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { loginSchema, registerSchema } from '../validation/authSchemas.js';

const authRouter = Router();
authRouter.get('/', (req, res) => {
  res.json({ message: 'Auth endpoint is live!' });
});

authRouter.get('/register', (req, res) => {
  res.json({ message: 'Register endpoint is live!' });
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
export default authRouter;
