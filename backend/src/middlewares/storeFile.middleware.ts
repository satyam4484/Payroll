
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import multer from 'multer';
import { Request } from 'express';


function createStorage(destinationFolder: string) {
    // Create an S3 client instance for interacting with Amazon S3
    const s3Client = new S3Client({
        region: process.env.AWS_REGION as string, // The AWS region where your S3 bucket is located
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY as string, // Your AWS access key
            secretAccessKey: process.env.AWS_SECRET_KEY as string // Your AWS secret key
        }
    });

    // Define a multer storage engine to store uploaded files in memory
    const storage = multer.memoryStorage();

    return {
        // Middleware for handling file uploads with multer using the configured storage
        upload: multer({ storage }),

        uploadFileToS3: async (req: Request, file: Express.Multer.File) => {
            return new Promise<string>(async (resolve, reject) => {
                const currentdate = new Date();
                const datetime = `${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`;

                const fileFormat = file.originalname.split('.').pop(); // Get the file format (extension)
                const fileNameParts = file.originalname.split('.');
                // Remove the last part (which is the file format or extension)
                fileNameParts.pop();

                // Join the remaining parts to get the filename
                const fileName = fileNameParts.join('.');
                const newFilename = `${fileName}_${datetime}.${fileFormat}`; // Create a new filename with date and time

                const bucket_name = process.env.BUCKET_NAME as string;
                // Define S3 parameters for the file upload
                const params: PutObjectCommandInput = {
                    Bucket: bucket_name as string, // Replace with your S3 bucket name
                    Key: `${destinationFolder}/${newFilename}`, // Use a unique filename within the destination folder
                    Body: file.buffer,
                };

                try {
                    // Upload the file to S3 using the AWS SDK
                    s3Client.send(new PutObjectCommand(params));
                    const bucketName = `${bucket_name}.s3.${process.env.AWS_REGION}.amazonaws.com`;

                    // Resolve with the public URL of the uploaded file
                    resolve(`https://${bucketName}/${destinationFolder}/${newFilename}`);
                } catch (error) {
                    // Reject the promise if there's an error during the upload
                    reject(error);
                }
            });
        },
    };
}

export default createStorage;

