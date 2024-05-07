import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for the root endpoint
app.get('/', (req: Request, res: Response) => {
    console.log(req.body || "No data received from the server");
    res.send({ message: "Welcome to the TypeScript server" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || '', {
}).then(() => {
    console.log("Database connected successfully");
    // Start the Express server
    app.listen(8000, () => {
        console.log("Backend server started at port 8001");
    });
}).catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if database connection fails
});
