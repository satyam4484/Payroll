import express from 'express';
import {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";

const router = express.Router();

// Route to add a new category
router.post('/', addCategory);

// Route to get all categories
router.get('/', getAllCategories);

// Route to get a category by ID
router.get('/:id', getCategoryById);

// Route to update a category by ID
router.put('/:id', updateCategory);

// Route to delete a category by ID
router.delete('/:id', deleteCategory);

export default router;
