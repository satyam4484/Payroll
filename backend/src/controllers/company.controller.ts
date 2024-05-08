import { Request, Response } from "express";
import Company, { CompanyInterface } from "../models/company.model";

export const createCompany = async (req: Request, res: Response) => {
    try {
        const data: CompanyInterface = req.body;
        const company = new Company(data);
        const savedCompany = await company.save();
        res.status(201).json({ error: false, savedCompany });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const getCompanyById = async (req: Request, res: Response) => {
    const companyId = req.params.id;
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: true, errorData: { message: 'Company not found' } });
        }
        res.status(200).json({ error: false, company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, errorData: { message: 'Error fetching company' } });
    }
}

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.find();
        res.status(200).json({ error: false, companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, errorData: { error } });
    }
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const companyId = req.params.id;
        const updates: Partial<CompanyInterface> = req.body;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: true, errorData: { message: 'Company not found' } });
        }
        Object.assign(company, updates);
        const updatedCompany = await company.save();
        res.status(200).json({ error: false, updatedCompany });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({ error: true, errorData: { message: 'Company not found' } });
        }
        res.status(200).json({ error: false, message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}
