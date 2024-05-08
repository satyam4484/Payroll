import express from 'express';
import { createCompany, getCompanyById, getAllCompanies, updateCompany, deleteCompany } from '../controllers/company.controller';

const router = express.Router();

// Route to create a new company
router.post('/', createCompany);

// Route to get a company by ID
router.get('/:id', getCompanyById);

// Route to get all companies
router.get('/', getAllCompanies);

// Route to update a company by ID
router.put('/:id', updateCompany);

// Route to delete a company by ID
router.delete('/:id', deleteCompany);

export default router;
