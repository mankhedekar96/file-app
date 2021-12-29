import express from 'express';
import bodyParser from 'body-parser';
import fileRouter from './routes/file-route.js';
import cors from 'cors';
import db from './model/index.js';

const app = express();

const port = 9000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.use(express.static('./uploads'));

app.listen(port, () =>{
    console.log('Server started');
});

app.use('/files', fileRouter);
