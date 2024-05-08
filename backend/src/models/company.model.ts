import { Schema, model } from 'mongoose';

export interface CompanyInterface{
    name:string;
    logo:string;
    email:string;
    contact:string;
    address:string;
    location:string;
    city:string;
    pincode:string;
}

const CompanySchema = new Schema<CompanyInterface>({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
});

const Company = model<CompanyInterface>('Company', CompanySchema);

export default Company;
