import express from "express";
import multer from "multer";
import fs from 'fs'
import { put } from '@vercel/blob'
import dotenv from 'dotenv'
import { addFood, listFood, removeFood } from "../controllers/foodController.js";


const foodRouter = express.Router();

// using static folder (uploads)--------------------------
// const uploadDir = '/tmp/uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const stoage = multer.diskStorage({
//     destination: uploadDir,
//     filename: (req, file, cb) => {
//         return cb(null, file.originalname)
//     }
// })

//using vercel blog storage-----------------------------

const upload = multer({ dest: "/tmp" });

foodRouter.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read file from /tmp
        const folderName = "foods";
        const filePath = req.file.path;
        const fileStream = fs.createReadStream(filePath);

        // Upload to Vercel Blob Storage
        const blob = await put(`${folderName}/${req.file.originalname}`, fileStream, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN // Makes the file accessible via URL
        });

        // File URL stored in blob.url
<<<<<<< HEAD
        const imageUrl = blob.url;
=======
        // const imageUrl = blob.url;
>>>>>>> 7cf022bfb12cd163a2b1f45aeedf835ee6ab2f03

        await addFood(req, res); // Modify your controller to accept imageUrl

        res.json({ message: "File uploaded successfully", imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
});




foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)


export default foodRouter;