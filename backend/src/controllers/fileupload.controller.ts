import { Request, Response } from "express";
import { S3Client ,DeleteObjectCommand } from "@aws-sdk/client-s3";
import createStorage from "../middlewares/storeFile.middleware";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,         // AWS access key
        secretAccessKey: process.env.AWS_SECRET_KEY as string,     // AWS secret key
    },
    region: process.env.AWS_REGION as string,                  // AWS region where the S3 bucket is located
});


// Function to upload a file to S3
export const uploadFile = async (req: Request, res: Response) => {
    try {
        // Check if a file is provided in the request
        if (!req.file) {
            throw new Error("No file provided. Please upload a file.");
        }

        // Get the destination folder from the request parameters
        const destinationFolder: string = req.params[0]; // Replace with your desired folder

        // Create a storage instance with the specified destination folder
        const { uploadFileToS3 }: { uploadFileToS3: Function } = createStorage(destinationFolder);
        // Upload the file to S3 and get the file URL
        const s3FileUrl: string = await uploadFileToS3(req, req.file, destinationFolder);

        // Send a success response with the S3 file URL
        res.status(200).send({ error: false, s3FileUrl });
    } catch (error) {
        // Send an error response if file upload fails
        res.status(500).send({ error: true, errorDate: { error } });
    }
};


// Function to handle file deletion requests
export const deleteFile = async (req: Request, res: Response) => {
    try {
        // Get the file path from the request body
        const { filePath } = req.body;
        // Delete the file from S3
        const fileDeleted = await deleteFileFromS3(filePath);

        // Check if the file was deleted successfully
        if (fileDeleted) {
            // Send a success response if the file was deleted successfully
            res.status(200).send({erro:false, Message:'File deleted successfully'});
        } else {
            // Throw an error if the file deletion failed
            throw new Error('Error deleting file from S3');
        }
    } catch (error) {
        // Send an error response if file deletion fails
        res.status(500).send({error:true, errorDate:{error}});
    }
};


// Function to delete a file from S3
const deleteFileFromS3 = async (fileUrl:string) => {
    try {
        // Extract the bucket name and object key from the file URL
        const urlParts = fileUrl.split('/');
        const bucketName = urlParts[2].split('.')[0]; // Assuming bucket name is in the third part of the URL
        const objectKey = urlParts.slice(3).join('/'); // Combine the remaining parts as the object key

        // Define parameters for the S3 delete operation
        const params = {
            Bucket: bucketName,
            Key: objectKey,
        };

        // Delete the file from S3
        const deleteObject = new DeleteObjectCommand(params);
        await s3.send(deleteObject);
        return true; // Return true if file deletion is successful
    } catch (error) {
        return false; // Return false if an error occurs during file deletion
    }
}