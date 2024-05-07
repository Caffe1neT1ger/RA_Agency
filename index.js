import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

import sequelize from './db.js';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandlingMiddlware.js';

const PORT = 5000 || process.env.PORT;
const __dirname = path.resolve(path.dirname(''));

dotenv.config();
const app = express();
app.use(
  cors(),
  // {origin:["tmp_domain.com"]}
);
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, './static/estate')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started on PORT:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
