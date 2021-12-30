import db from "../model/index.js";
const FileModel = db.files;

const getFiles = async (req, res) => {
    try {
        const files = await FileModel.findAll();

        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

const createFile = async (req, res) => {
    console.log("Create File >>> ", req.body);
    try {
        const files = req.files;
        if (!files) {
            return res.status(400).send({ message: 'Please upload a file.' });
        }

        const filePromises = files.map(file => {
            const newFile = {
                name: file.filename,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            return FileModel.create(newFile);
        });

        Promise.all(filePromises).then((values) => {
            console.log(values);
            res.send({ message: 'Uploaded successfully.', files });
        }).catch(error => {
            console.log("Database error!", error);
            res.status(400).json({ message: error });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error });
    }
};

const updateFile = async (req, res) => {
    console.log("Update File >>> ", req.body);
    const id = req.params.id;

    try {
        const stud = await FileModel.update({
            name: req.body.name,
            updatedAt: new Date()
        }, {
            where: { id }
        });
        res.status(201).json(stud);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFile = async (req, res) => {
    const id = req.params.id;
    try {
        const stud = await FileModel.destroy({
            where: { id }
        });
        res.status(200).json(stud);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default {
    getFiles,
    createFile,
    updateFile,
    deleteFile
};