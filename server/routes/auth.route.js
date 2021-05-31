import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import checkJWT from '../middlewares/checkJWT';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ success: false, error: 'Invalid credentials' });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send({ success: false, error: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(403).send({ success: false, error: 'Incorrect password' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res
    .status(200)
    .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    .send({ success: true, data: { _id: user._id, username: user.username } });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send({ success: false, error: 'User already exists' });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPwd });

  res.status(201).send({ success: true, data: { _id: user._id, username: user.username } });
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token');

  res.status(200).send({ success: true });
});

router.get('/me', [checkJWT], async (req, res) => {
  res.status(200).send({ success: true, data: { _id: req.user.id, username: req.user.username } });
});

export default router;
