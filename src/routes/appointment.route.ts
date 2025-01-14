import express from 'express';
import { bookAppointment } from '../controller/appointment.controller';

const router = express.Router();

// Route to book an appointment
router.post('/book', bookAppointment);

export default router;
