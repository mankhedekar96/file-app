import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import conn from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFiles = async (req, res) => {
    try {
        const files = conn.query('SELECT * FROM FILES');
        
        res.status(200).json(files);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

const createFile =  async (req, res) => {
    console.log("Create File >>> ", req.body);
    try {
        const files = req.files;
        if (!files) {
            return res.status(400).send({ message: 'Please upload a file.' });
        }

        const filePromises = files.map(file => {
            let sql = "INSERT INTO files(name) VALUES ('" + file.filename + "')";
            return conn.query(sql);
        });

        Promise.all(filePromises).then((values) => {
            console.log(values);
            res.send({ message: 'Uploaded successfully.', files }); 
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({ message : error.message});
    }
};

const updateFile =  async (req, res) => {
    console.log("Update File >>> ", req.body);
    const id = req.params.id;
    const updatedData = {
        name: req.body.name,
        description: req.body.description,
        locality: req.body.locality,
        price: req.body.price,
        address: req.body.address,
        carpetArea: req.body.carpetArea,
        images: req.body.images
    };

    try {
        await File.findByIdAndUpdate(id, updatedData);
        const stud = await File.findById(id);
        res.status(201).json(stud);
    } catch(error) {
        res.status(400).json({ message : error.message});
    }
};

const deleteFile =  async (req,res) => {
    const id = req.params.id;
    try {
        const stud = await File.findByIdAndRemove(id);
        res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

export default {
    getFiles,
    createFile,
    updateFile,
    deleteFile
};