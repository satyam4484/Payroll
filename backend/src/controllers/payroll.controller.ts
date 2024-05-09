import { Request, Response } from "express";
import Payroll, { PayrollInterface } from "../models/Payroll.model";
import Company from "../models/company.model";
import User from "../models/user.model";

// Create a new payroll
export const createPayroll = async (req: Request, res: Response) => {
    try {
        const data: any= req.body;
        const newPayroll = new Payroll({
            HRA:data.HRA,
            Conveyance:data.Conveyance,
            WashingAllowance:data.WashingAllowance,
            MedicalAllowance:data.MedicalAllowance,
            OtherAllowance:data.OtherAllowance,
            EmployeePF:data.EmployeePF,
            EmployeesESIC:data.EmployeesESIC,
            PT:data.PT,
            MLWF:data.MLWF,
            EmployerPF:data.EmployerPF,
            EmployerESIC:data.EmployerESIC
        });
        const savedPayroll = await newPayroll.save();
        if(data.type ==="company"){
            await Company.findByIdAndUpdate(data._id,{$set:{payroll:savedPayroll._id}},{new:true});
        }else if(data.type ==="Employee"){
            await User.findByIdAndUpdate(data._id,{$set:{payroll:savedPayroll._id}},{new:true});
        }
        res.status(201).json({ error: false, savedPayroll });
    } catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}


// Get payroll by ID
export const getPayrollById = async (req: Request, res: Response) => {
    try {
        const payrollId = req.params.id;
        const payroll = await Payroll.findById(payrollId);
        if (!payroll) {
            return res.status(404).json({ error: true, errorData: { message: 'Payroll not found' } });
        }
        res.status(200).json({ error: false, payroll });
    } catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}

// Update payroll by ID
export const updatePayroll = async (req: Request, res: Response) => {
    try {
        const payrollId = req.params.id;
        const updates: Partial<PayrollInterface> = req.body;
        const payroll = await Payroll.findByIdAndUpdate(payrollId, updates, { new: true });
        if (!payroll) {
            return res.status(404).json({ error: true, errorData: { message: 'Payroll not found' } });
        }
        res.status(200).json({ error: false, updatedPayroll: payroll });
    } catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}

// Delete payroll by ID
export const deletePayroll = async (req: Request, res: Response) => {
    try {
        const payrollId = req.params.id;
        const payroll = await Payroll.findByIdAndDelete(payrollId);
        if (!payroll) {
            return res.status(404).json({ error: true, errorData: { message: 'Payroll not found' } });
        }
        res.status(200).json({ error: false, message: 'Payroll deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: true, errorData: { error } });
    }
}
