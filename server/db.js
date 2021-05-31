import mongoose from 'mongoose';

export function connectDB() {
  return mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  });
}
