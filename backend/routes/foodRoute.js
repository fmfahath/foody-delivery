import express from "express";
import multer from "multer";
import fs from 'fs'
import { addFood, listFood, removeFood } from "../controllers/foodController.js";


const foodRouter = express.Router();

const uploadDir = '/tmp/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const stoage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        return cb(null, file.originalname)
    }
})

const upload = multer({ storage: stoage })

foodRouter.post('/add', upload.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)


export default foodRouter;