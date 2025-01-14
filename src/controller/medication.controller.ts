import { Request, Response } from 'express';
import { Medication } from '../model/medication.model';

// Controller to handle adding medications
export const addMedications = async (req:Request, res:Response) => {
  try {
    const { medications } = req.body; 
    const userID = req.params.userId;

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ message: 'Medications must be a non-empty array.' });
    }

    // Prepare medication documents to insert
    const medicationDocs = medications.map((med) => ({
      userID,
      name: med.name,
      times: med.times
    }));

    await Medication.insertMany(medicationDocs);

    res.status(201).json({ message: 'Medications added successfully' });
  } catch (error) {
    console.error('Error adding medications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to handle fetching medications
export const getMedications = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const medications = await Medication.find({ userID });

    res.status(200).json({ medications });
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
