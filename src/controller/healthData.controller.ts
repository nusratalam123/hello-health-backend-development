import { NextFunction, Request, Response } from "express";

import HealthData from '../model/healthData.model';

// get all car posts
export const getSingleHealthData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params; // Extract userId from URL
    console.log('User ID:', userId);
    const data = await HealthData.find({userID:userId})

    res.status(200).json({
      message: "get health data successfully",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

// Controller to handle health data submission (create or update)
export const submitHealthData = async (req: Request, res: Response) => {
  try {
    // console.log('Received body:', req.body); 

    const { userID,age, cholesterol, bloodPressure, diabetes, temperature, heartRate } = req.body;

    console.log(userID,age, cholesterol, bloodPressure, diabetes, temperature, heartRate);

    // Analyze health data and generate feedback
    let feedback = [];
    let condition = 'Good';

    if (cholesterol > 200) {
      feedback.push('Your cholesterol level is high. Reduce fat intake and exercise regularly.');
      condition = 'Needs Attention';
    }

    if (bloodPressure === 'high') {
      feedback.push('Your blood pressure is high. Monitor it regularly and consult a doctor.');
      condition = 'Needs Attention';
    }

    if (diabetes === 'true' || diabetes === true) {
      feedback.push('You have diabetes. Follow a low-sugar diet and consult a healthcare professional.');
      condition = 'Critical';
    }

    if (temperature > 99.5) {
      feedback.push('You have a high temperature. This might indicate a fever.');
    }

    if (heartRate > 100) {
      feedback.push('Your heart rate is high. Reduce stress and consult a doctor.');
    }

    // Check if the user already has health data
    let healthData = await HealthData.findOne({ userID });

    if (healthData) {
      // If health data exists, update it
      healthData.age = age;
      healthData.cholesterol = cholesterol;
      healthData.bloodPressure = bloodPressure;
      healthData.diabetes = diabetes === 'true';
      healthData.temperature = temperature;
      healthData.heartRate = heartRate;
      if (req.file?.path) {
        healthData.reportImageUrl = req.file.path;
      }

      await healthData.save();

      res.status(200).json({
        message: 'Health data updated successfully',
        condition,
        feedback,
        imageUrl: healthData.reportImageUrl
      });
    } else {
      // If no health data exists, create a new entry
      healthData = new HealthData({
        userID,
        age,
        cholesterol,
        bloodPressure,
        diabetes: diabetes === 'true',
        temperature,
        heartRate,
        reportImageUrl: req.file?.path
      });

      await healthData.save();

      res.status(200).json({
        message: 'Health data created successfully',
        condition,
        feedback,
        imageUrl: req.file?.path
      });
    }
  } catch (error) {
    console.error('Error saving health data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};