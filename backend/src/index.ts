import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRouter from "./routes/index";

dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.text());

// Define a route for the root endpoint
app.use('/api',mainRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || '', {
}).then(() => {
    console.log("Database connected successfully");
    // Start the Express server
    app.listen(8000, () => {
        console.log("Backend server started at port 8000");
    });
}).catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if database connection fails
});
export default app;