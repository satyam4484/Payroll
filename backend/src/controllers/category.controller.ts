import { Request, Response } from "express";
import Category, { CategoryInterface } from "../models/category.model";

export const addCategory = async (req: Request, res: Response) => {
    try {
        const data: CategoryInterface = req.body;

        // Create a new category instance
        const newCategory = new Category(data);

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        // Send a success response with the saved category data
        res.status(201).json({error:false,savedCategory});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}

