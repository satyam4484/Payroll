import User from "../models/user.model";

const generateRandomDigitNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000;
}

export const generateUniqueId = async (value:string) :Promise<string> => {
    let isUniqueIdGenerated = false;
    let uniqueId="EMP-00000";
    while (!isUniqueIdGenerated) {
        uniqueId = value + generateRandomDigitNumber();
        const existingUser = await User.findOne({ user_id: uniqueId });
        if (!existingUser) {
            isUniqueIdGenerated = true;
        }
    }
    return uniqueId;
}