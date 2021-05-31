require('dotenv').config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { connectDB } from './db';
import routes from './routes';
import errorHandler from './errorHandler';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());

app.use(logger(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api', routes);

app.use(errorHandler);

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Node server is up and running at ${HOST}:${PORT}.`);
    });
  } catch (err) {
    console.error(`Failed to set up the server. Reason: ${err}`);
    process.exit(1);
  }
})();
