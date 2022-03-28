import express from 'express';
import dotenv from 'dotenv';

import { goalsRouter } from './routes/goals';
import { errorHandler } from './middlewares/error';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/goals', goalsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
