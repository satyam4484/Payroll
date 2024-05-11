import express from 'express';
import { createPayroll, getPayrollById, updatePayroll, deletePayroll } from '../controllers/payroll.controller';

const router = express.Router();

// Create a new payroll
router.post('/', createPayroll);

// Get payroll by ID
router.get('/:id', getPayrollById);

// Update payroll by ID
router.put('/:id', updatePayroll);

// Delete payroll by ID
router.delete('/:id', deletePayroll);

export default router;
