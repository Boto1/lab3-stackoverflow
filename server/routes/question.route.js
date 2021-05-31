import express from 'express';
import checkJWT from '../middlewares/checkJWT';

import Question from '../models/question';

const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find({}).populate({ path: 'answers', populate: 'user' }).populate('user');

  res.status(200).send({ success: true, data: questions });
});

router.get('/:id', async (req, res) => {
  const questionId = req.params.id;
  const questions = await Question.findOne({ _id: questionId }).populate('user');

  res.status(200).send({ success: true, data: questions });
});

router.post('/', [checkJWT], async (req, res) => {
  const user = req.user;
  const { heading, description } = req.body;

  const question = await Question.create({ heading, description, user: user.id });

  res.status(201).send({ success: true, data: question });
});

router.put('/:id', [checkJWT], async (req, res) => {
  const questionId = req.params.id;
  const { heading, description } = req.body;

  const question = await Question.findOneAndUpdate({ _id: questionId }, { heading, description }, { new: true });

  res.status(201).send({ success: true, data: question });
});

router.delete('/:id', [checkJWT], async (req, res) => {
  const questionId = req.params.id;

  const question = await Question.findOne({ _id: questionId });
  await question.deleteOne();

  res.status(204).send({ success: true, data: { id: questionId } });
});

export default router;
