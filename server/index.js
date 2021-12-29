import express from 'express';
import bodyParser from 'body-parser';
import fileRouter from './routes/file-route.js';
import cors from 'cors';
import conn from './db.js';

const app = express();

const port = 9000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// serving static files
// app.use('/', (req, res) => {
//     res.send(`You've hit empty route!`);
// });

app.use(express.static('./uploads'));

app.listen(port, () =>{
    console.log('Server started');
});

app.use('/files', fileRouter);