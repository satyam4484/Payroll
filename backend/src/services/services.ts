import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Types } from "mongoose";
dotenv.config();


const generateRandomDigitNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}
export const getGMT = (date: Date) => {
    date.setMinutes(date.getMinutes() + 5.5 * 60); // Adjust to GMT+5:30
    return date;
}

export const logVariable = (variable: any): void => {
    const stackTrace = new Error().stack;
    const callerLine = stackTrace?.split("\n")[2]?.trim();
    const callerInfo = callerLine?.substring(callerLine.indexOf("at ") + 3);
    const variableName = Object.keys(globalThis).find(key => (globalThis as any)[key] === variable);

    console.groupCollapsed(`🔍 Variable: ${variableName}`);
    console.log("📝 Value:", variable);
    console.log("📍 Called from:", callerInfo);
    console.groupEnd();
};


export const generateUniqueId = async (value: string): Promise<string> => {
    let isUniqueIdGenerated = false;
    let uniqueId = "EMP-00000";
    while (!isUniqueIdGenerated) {
        uniqueId = value + generateRandomDigitNumber();
        const existingUser = await User.findOne({ user_id: uniqueId });
        if (!existingUser) {
            isUniqueIdGenerated = true;
        }
    }
    return uniqueId;
}

export const generateAuthToken = (id: Types.ObjectId) => {
    const SECRET_KEY: string = process.env.SECRET_KEY as string;
    return jwt.sign({ _id: id }, SECRET_KEY);
};