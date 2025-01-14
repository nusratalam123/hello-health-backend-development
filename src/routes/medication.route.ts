import express from 'express';
import { addMedications, getMedications } from '../controller/medication.controller';

const router = express.Router();

// Route to add medications
router.post('/add/:userId', addMedications);

// Route to fetch medications
router.get('/list/:userId',  getMedications);

export default router;
