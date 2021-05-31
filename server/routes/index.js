import express from 'express';

import userRoutes from './user.route';
import questionRoutes from './question.route';
import answerRoutes from './answer.route';
import authRoutes from './auth.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);

export default router;
