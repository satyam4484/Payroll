import express from 'express';

import {addCategory} from "../controllers/category.controller";

const router = express.Router();


router.post('/',addCategory);


export default router;