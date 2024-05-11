import express from 'express';
import {
    createUser,
    generatePassword,
    getUserById,
    getAllUsers,
    updateUser,
    loginUser,
    getFilterUserData
} from "../controllers/user.controller";

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

router.post('/login', loginUser);

// Route to generate a new password for a user
router.post('/generatePassword', generatePassword);

// Route to get all users
router.get('/', getAllUsers);

router.get('/filter', getFilterUserData);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to update a user by ID
router.put('/:id', updateUser);

export default router;
