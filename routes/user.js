import express from 'express';
import {getUser} from "../controllers/user_controller.js";

const router = express.Router();
// Get user details
router.get('/:id',getUser);

export default router;