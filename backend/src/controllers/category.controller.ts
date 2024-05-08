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

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Send a success response with the fetched categories
        res.status(200).json({ error: false, categories });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}


export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;

        // Fetch the category from the database by ID
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: true, message: 'Category not found' });
        }

        // Send a success response with the fetched category
        res.status(200).json({ error: false, category });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const newData: CategoryInterface = req.body;

        // Find the category by ID and update it with new data
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, newData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: true, message: 'Category not found' });
        }

        // Send a success response with the updated category
        res.status(200).json({ error: false, updatedCategory });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ error: true, message: 'Category not found' });
        }

        // Send a success response with the deleted category
        res.status(200).json({ error: false, deletedCategory });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}

