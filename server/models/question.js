import mongoose from 'mongoose';
import Answer from './answer';

const questionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answers: [{ ref: 'Answer', type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

questionSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Answer.deleteMany({ question: this._id });
  next();
});

export default mongoose.model('Question', questionSchema);
