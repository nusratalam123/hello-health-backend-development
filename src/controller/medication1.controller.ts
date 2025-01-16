import { Request, Response } from 'express';
import { Medication } from '../model/medication1.model';

// Controller to add medications
export const addMedications = async (req: Request, res: Response) => {
    try {
      const { medications, userEmail } = req.body; 
      const userID = req.params.userId;
  
      if (!Array.isArray(medications) || medications.length === 0) {
        return res.status(400).json({ message: 'Medications must be a non-empty array.' });
      }
  
      // Prepare medication documents to insert
      const medicationDocs = medications.map((med) => ({
        userID,
        userEmail, // Include userEmail
        name: med.name,
        times: med.times,
        startDate: med.startDate,
        endDate: med.endDate
      }));
  
      await Medication.insertMany(medicationDocs);
  
      res.status(201).json({ 
        message: 'Medications added successfully',
        medications});
    } catch (error) {
      console.error('Error adding medications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller to get medications by userID
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
