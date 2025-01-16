import { Doctor } from '../model/doctor.model';
import cloudinary from 'cloudinary';
import { NextFunction, Request, Response } from "express";


interface Filter {
    hospital?: { $regex: string, $options: string };
    specialty?: { $regex: string, $options: string };
  }

// Controller to fetch all doctors with optional filters
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { hospital, specialty } = req.query;

    const filter: Filter = {};

    if (hospital) filter.hospital = { $regex: String(hospital), $options: 'i' };
    if (specialty) {
        const specialtyString = Array.isArray(specialty) ? specialty[0] : specialty;
        filter.specialty = { $regex: String(specialtyString), $options: 'i' };
    } 

    const doctors = await Doctor.find(filter);
    res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller to fetch a single doctor by ID
export const getSingleDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;

    // Check if doctorId is provided
    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    // Find doctor by ID
    const doctor = await Doctor.findById(doctorId);

    // Check if doctor exists
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Return the doctor details
    res.status(200).json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const addDoctor = async (req:Request, res:Response) => {
    try {
      const { name, specialty, hospital } = req.body;
  
      // Check if Multer threw a file type error
      if (!req.file) {
        return res.status(400).json({ message: 'Only JPG, JPEG, and PNG files are allowed' });
      }
  
      const doctor = new Doctor({ name, specialty, hospital, image: req.file.path });
      await doctor.save();
  
      res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (error:any) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  