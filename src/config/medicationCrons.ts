import cron from 'node-cron';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { Medication } from '../model/medication.model';
import User from '../model/user.model';
import config from './secret';

// Connect to MongoDB if not already connected
mongoose.connect(config.MONGO_URL as string);

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service (e.g., Outlook, Yahoo)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// Function to send email
const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email address
      to,                           // Receiver's email address
      subject,                      // Email subject
      text                          // Email body
    });
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to add minutes to a time string (HH:mm)
const addMinutesToTime = (time: string, minutes: number) => {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString().slice(11, 16); // Return in HH:mm format
};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    console.log('Running medication notification job...');

    const now = new Date();
    const currentTime = now.toISOString().slice(11, 16); // Get current time in HH:mm format

    const medications = await Medication.find({
        times: { $in: [addMinutesToTime(currentTime, 5)] }
      }).populate('userID').exec(); // Use exec() to wait for the population
      
      // Send email notifications for each medication
      for (const med of medications) {
        const user = await User.findById(med.userID); // Find the User document
        const email = user?.email ?? 'nusratalam975@gmail.com';
        const subject = `Reminder: Time to take your medication (${med.name})`;
        const text = `This is a reminder to take your medication "${med.name}" at ${med.times.join(', ')}.`;
      
        if (email !== undefined) {
            await sendEmail(email, subject, text);
          } else {
            console.error('No email address found for user');
          }
      }
  } catch (error) {
    console.error('Error running medication notification job:', error);
  }
});
