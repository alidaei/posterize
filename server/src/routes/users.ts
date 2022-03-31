import express from 'express';

import { registerUser, loginUser, getMe } from '../controllers/users';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export { router as usersRouter };
