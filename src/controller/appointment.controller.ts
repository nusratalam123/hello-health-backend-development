import { Appointment } from '../model/appointment.model.js';
import { Doctor } from '../model/doctor.model.js';
import { NextFunction, Request, Response } from "express";


// Controller to handle booking an appointment
export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, date, additionalInfo, doctorId } = req.body;
    console.log(fullName, email, phone, date, additionalInfo, doctorId);

    // Validate required fields
    if (!fullName || !email || !phone || !date || !doctorId) {
      return res.status(400).json({ message: 'Full Name, Email, Phone Number, Preferred Date, and Doctor ID are required' });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      fullName,
      email,
      phone,
      date,
      additionalInfo,
      doctor: doctorId,
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
