import express from 'express';
import { addCaloriesItem, getReport } from "../controllers/calories_controller.js";

const router = express.Router();
// Add calories consumption item
router.post('/addcalories',addCaloriesItem);
  
// Get monthly report
router.get('/report',getReport);

export default router;
