import express from 'express';
import fileController from '../controllers/file.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
  
var upload = multer({ storage: storage });

router.get('/', fileController.getFiles);
router.post('/', upload.array('images', 5), fileController.createFile);
router.patch('/:id', fileController.updateFile);
router.delete('/:id', fileController.deleteFile);

export default router;