import { Request, Response } from "express";
import User, { UserInterface } from "../models/user.model";
import secureRandomPassword from "secure-random-password";
import { generateUniqueId, generateAuthToken } from "../services/services";
import bcrypt from "bcryptjs";


export const loginUser = async (request: Request, response: Response) => {
    try {
        // Get the user data from the request body
        const userData: { user_id: string; password: string } = request.body;

        // Find a user with the provided user ID
        const user = await User.findOne({ user_id: userData.user_id });

        // Check if the user is found
        if (user) {
            // Check if the user's account is active

            // Verify the password
            const isPasswordValid = await bcrypt.compare(userData.password, user.password);

            // If the password is verified, send a success response with an authentication token
            if (isPasswordValid) {
                const authToken = generateAuthToken(user._id);
                response.send({ error: false, Mesage: "Logged in successfully", token: authToken });
            } else {
                // If the password is not valid, throw an error
                throw new Error("Invalid Password");
            }
        }else {
        // If the user is not found, throw an error
        throw new Error("Invalid User ID");
    }
} catch (error) {
    // Log the error and send an error response
    response.status(500).send({error:true, errorData: { error }});
}
};

export const generatePassword = async (req: Request, res: Response) => {
    try {
        const userId: string = req.body.user_id;
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ error: true, errorData: { message: 'User not found' } });
        }

        const password: string = secureRandomPassword.randomPassword({ length: 12, characters: [secureRandomPassword.lower, secureRandomPassword.upper] });

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ error: false, message: 'Password generated successfully', user: { user_id: userId, password } });

    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const data: Partial<UserInterface> = req.body;
        const uniqueId: string = await generateUniqueId(data.user_role === "Employee" ? "EMP" : "SUP");
        const password: string = secureRandomPassword.randomPassword({ length: 12, characters: [secureRandomPassword.lower, secureRandomPassword.upper] });
        // const profile_pic = defaultPics[request.body.user_roles];
        const user = new User({ user_id: uniqueId, password, ...data });
        const savedUser = await user.save();

        res.status(201).json({ error: false, user: { user_id: savedUser.user_id, password } });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send({ error: true, errorData: { error } });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate("company").populate("category");
        if (!user) {
            return res.status(404).json({ error: true, errorData: { message: 'User not found' } });
        }
        res.status(200).json({ error: false, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, errorData: { message: 'Error fetching user' } });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select('-password').populate("category");
        // Send a success response with the list of users
        res.status(200).json({ error: false, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, errorData: { error } });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updates: Partial<UserInterface> = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, errorData: { message: 'User not found' } });
        }
        Object.assign(user, updates);

        // Save the updated user to the database
        const updatedUser = await user.save();
        res.status(200).json({ error: false, updatedUser });
    } catch (error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}


export const getFilterUserData = async(req:Request,res:Response) => {
    try{
        const queryParams = req.query;
        const filter: any = {};
        if (queryParams.company) {
            filter.company = queryParams.company.toString();
        }
        if (queryParams.category) {
            filter.category = queryParams.category.toString();
        }
        const users: UserInterface[] = await User.find(filter).select("-password").populate([
            {path:'company',select:'name _id'},
            {path:'category',select:'category_name _id'}
        ]);
        res.status(200).json({ error: false, users })

    }catch(error) {
        res.status(500).send({ error: true, errorData: { error } });
    }
}

