import express from 'express';
import { addMedications, getMedications } from '../controller/medication1.controller';

const router = express.Router();

router.post('/add/:userId', addMedications); // Add medications
router.get('/all/:userId', getMedications);  // Get medications by user ID

export default router;
