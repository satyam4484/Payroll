import express from "express";
const router = express.Router();

import { uploadFile, deleteFile } from '../controllers/fileupload.controller' // Import the file upload controller

// Create storage middleware for file uploads using the createStorage function
import createStorage from "../middlewares/storeFile.middleware.js";

const { upload } = createStorage('upload');

// Define a route for uploading files
router.route('/upload/*').post(upload.single('file'), uploadFile);

// Define a route for deleting files
router.post('/delete', deleteFile);

export default router;
