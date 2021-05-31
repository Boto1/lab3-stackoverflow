import express from 'express';

import User from '../models/user';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('questions');

  res.status(200).send({ data: users });
});

export default router;
