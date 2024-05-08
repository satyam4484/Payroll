import { Request, Response } from "express";
import User, { UserInterface } from "../models/user.model";
import secureRandomPassword from "secure-random-password";
import { generateUniqueId } from "../services/services";

export const createUser = async(req:Request,res:Response)=>{
    try {
        const data:Partial<UserInterface> = req.body;
        const uniqueId:string = await generateUniqueId(data.user_role==="Employee"?"EMP":"SUP");
        const password:string= secureRandomPassword.randomPassword({ length: 12, characters: [secureRandomPassword.lower, secureRandomPassword.upper] });
        // const profile_pic = defaultPics[request.body.user_roles];
        const user = new  User({user_id:uniqueId,password,...data});
        const savedUser = await user.save();

        res.status(201).json({error:false,savedUser});
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}
