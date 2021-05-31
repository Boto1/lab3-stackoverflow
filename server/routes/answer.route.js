import express from 'express';
import checkJWT from '../middlewares/checkJWT';

import Answer from '../models/answer';
import Question from '../models/question';

const router = express.Router();

router.post('/', [checkJWT], async (req, res) => {
  const user = req.user;
  const { text, questionId } = req.body;

  let answer = await Answer.create({ text, user: user.id, question: questionId });

  await Question.findOneAndUpdate({ _id: questionId }, { $push: { answers: answer } });

  answer = await answer.populate('user').execPopulate();
  delete answer.user.password;

  res.status(201).send({ success: true, data: answer });
});

router.put('/:id', [checkJWT], async (req, res) => {
  const answerId = req.params.id;
  const { text } = req.body;

  const answer = await Answer.findOneAndUpdate({ _id: answerId }, { text }, { new: true });

  res.status(201).send({ success: true, data: answer });
});

router.delete('/:id', [checkJWT], async (req, res) => {
  const answerId = req.params.id;

  await Answer.deleteOne({ _id: answerId });

  res.status(204).send({ success: true, data: { id: answerId } });
});

export default router;
