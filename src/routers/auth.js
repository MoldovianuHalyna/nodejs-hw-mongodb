import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../utils/validateBody';

import { registerSchema } from '../validation/authSchemas';

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema));

export default authRouter;
