import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    question: {
      ref: 'Question',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Answer', answerSchema);
