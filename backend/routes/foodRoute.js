import express from "express";
import multer from "multer";
import { addFood } from "../controllers/foodController.js";


const foodRouter = express.Router();

const stoage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, file.originalname)
    }
})

const upload = multer({ storage: stoage })

foodRouter.post('/add', upload.single('image'), addFood)

export default foodRouter;