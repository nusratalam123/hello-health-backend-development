import { Request, Response } from 'express';
import { HealthSuggestionData } from '../model/healthSuggesstionData.model';
import { Food } from '../model/food.model';

export const analyzeHealthData = async (req: Request, res: Response) => {
    try {
      const { userID, age, cholesterol, bloodPressure, normalBloodPressure,diabetes, smoking, kidneyDisease, temperature, heartRate } = req.body;
  
      // Validate required fields
      if (!userID) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      let riskFactors = 0;
      const feedback: string[] = [];
  
      // Analyze cholesterol
      if (cholesterol > 200) {
        riskFactors++;
        feedback.push('Your cholesterol level is high. Consider reducing fat intake.');
      }
  
      // Analyze blood pressure
      const [systolic, diastolic] = bloodPressure.split('/').map(Number);
      if (systolic > 130 || diastolic > 80) {
        riskFactors++;
        feedback.push('Your blood pressure is elevated. Monitor it regularly.');
      }
  
      // Analyze diabetes
      if (diabetes > 6.5) {
        riskFactors++;
        feedback.push('Your diabetes level is high. Follow a low-sugar diet.');
      }
  
      // Analyze smoking and kidney disease
      if (smoking) {
        riskFactors++;
        feedback.push('Smoking increases cardiovascular risk. Consider quitting.');
      }
      if (kidneyDisease) {
        riskFactors++;
        feedback.push('Kidney disease can increase heart risk. Consult a doctor.');
      }
  
      // Analyze heart rate
      if (heartRate > 100 || heartRate < 60) {
        riskFactors++;
        feedback.push('Your heart rate is abnormal. Monitor it regularly.');
      }
  
      // Determine condition
      let condition: 'good' | 'moderate' | 'bad';
      if (riskFactors === 0) condition = 'good';
      else if (riskFactors <= 2) condition = 'moderate';
      else condition = 'bad';
  
      // Check if health data already exists for the user
      const existingHealthData = await HealthSuggestionData.findOne({ userID });
  
      if (existingHealthData) {
        // Update existing health data
        existingHealthData.age = age;
        existingHealthData.cholesterol = cholesterol;
        existingHealthData.bloodPressure = bloodPressure;
        existingHealthData.normalBloodPressure = normalBloodPressure;
        existingHealthData.diabetes = diabetes;
        existingHealthData.smoking = smoking;
        existingHealthData.kidneyDisease = kidneyDisease;
        existingHealthData.temperature = temperature;
        existingHealthData.heartRate = heartRate;
        existingHealthData.condition = condition;
        existingHealthData.feedback = feedback;
  
        await existingHealthData.save();
      } else {
        // Create new health data
        const healthData = new HealthSuggestionData({
          userID,
          age,
          cholesterol,
          bloodPressure,
          normalBloodPressure,
          diabetes,
          smoking,
          kidneyDisease,
          temperature,
          heartRate,
          condition,
          feedback
        });
        await healthData.save();
      }
  
      // Fetch 8 good and risky foods from the database
      const goodFoods = await Food.aggregate([
        { $match: { type: 'good' } },
        { $sample: { size: 8 } }
      ]);
  
      const riskyFoods = condition === 'good' ? [] : await Food.aggregate([
        { $match: { type: 'risky' } },
        { $sample: { size: 8 } }
      ]);
  
      // Return analysis result with food suggestions
      res.status(200).json({
        message: 'Health analysis completed successfully',
        condition,
        feedback,
        goodFoods,
        riskyFoods
      });
    } catch (error) {
      console.error('Error analyzing health data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


// Controller to get single user health data by userId
export const getSingleUserHealthData = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      // Find health data by userId
      const healthData = await HealthSuggestionData.findOne({ userId });
  
      if (!healthData) {
        return res.status(404).json({ message: 'Health data not found for this user' });
      }
  
      res.status(200).json({ message: 'Health data retrieved successfully', healthData });
    } catch (error) {
      console.error('Error fetching health data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };