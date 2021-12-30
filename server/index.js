import express from 'express';
import bodyParser from 'body-parser';
import fileRouter from './routes/file-route.js';
import cors from 'cors';
import db from './model/index.js';
import path from 'path';

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

//route to download a file
app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./uploads', file);
    console.log(fileLocation);
    res.download(fileLocation, file);
});
