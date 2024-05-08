import { ObjectId, Schema, model } from "mongoose";
import { hashUserPassword } from "../middlewares/middlewares";
// Interface for user data with type safety
export interface UserInterface {
    name: string;
    user_id?:string;
    profile_pic: string;
    email: string;
    contact: string;
    aadhar?: { // Make aadhar optional (can be null)
        aadhar_no: string;
        aadhar_photo: string;
    };
    date_of_birth: Date;
    pancard?: {
        pancard_no: string;
        pancard_photo: string;
    };
    pf?: {
        pf_no: string;
        pf_photo: string;
    };
    un_no?: string;
    esic?: {
        esic_no: string;
        esic_photo: string;
    };
    password: string;
    user_role: string;
    category:ObjectId;
}

// Mongoose schema for user data
const userSchema = new Schema<UserInterface>({
    name: { type: String, required: true },
    user_id: {type: String,unique: true,optional:true},
    profile_pic: String,
    email: { type: String, required: true, unique: true }, // Make email unique
    contact: String,
    aadhar: { type: Schema.Types.Mixed, optional: true }, // Use Mixed type for nested aadhar object
    date_of_birth: { type: Date, required: true },
    pancard: { type: Schema.Types.Mixed, optional: true }, // Use Mixed type for nested pancard object
    pf: { type: Schema.Types.Mixed, optional: true }, // Use Mixed type for nested pf object
    un_no: String,
    esic: { type: Schema.Types.Mixed, optional: true }, // Use Mixed type for nested esic object
    password: { type: String, required: true },
    user_role: {
        type: String,
        enum: ["Employee", "Employer", "Admin", "CEO"], // User role values
    },
    category:{type:Schema.Types.ObjectId,required:true}
});

userSchema.pre("save",hashUserPassword);


const User = model<UserInterface>("User", userSchema);
export default User;
