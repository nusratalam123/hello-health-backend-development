// import schedule from 'node-schedule';
// import nodemailer from 'nodemailer';
// import { Medication } from '../model/medication1.model';
// import User from '../model/user.model';

// // Schedule a job to run every minute
// schedule.scheduleJob('*/1 * * * *', async () => {
//     try {
//       const currentTime = new Date();
//       currentTime.setSeconds(0, 0); // Ignore seconds and milliseconds
  
//       // Find medications where current time is 5 minutes before any of the times
//       const medications = await Medication.find({
//         times: { $in: [getFormattedTime(new Date(currentTime.getTime() + 5 * 60 * 1000))] }
//       });
  
//       medications.forEach(async (med) => {
//         // Send email notification
//         await sendEmailNotification(med.userEmail, med.name, med.times);
//         console.log(`Notification sent for medication ${med.name} to ${med.userEmail}`);
//       });
//     } catch (error) {
//       console.error('Error in scheduled job:', error);
//     }
//   });
  
//   function getFormattedTime(date: Date): string {
//     return date.toISOString().substr(11, 5); // Get "HH:mm" format
//   }
  
//   async function sendEmailNotification(userEmail: string, medicationName: string, times: string[]) {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'nusratalam975@gmail.com', // Replace with your email
//         pass: process.env.EMAIL_PASS, // Replace with your password or app password
//       }
//     });
  
//     const mailOptions = {
//       from: 'nusratalam975@gmail.com',
//       to: userEmail,
//       subject: 'Medication Reminder',
//       text: `This is a reminder to take your medication: ${medicationName} at the specified times: ${times.join(', ')}`
//     };
  
//     await transporter.sendMail(mailOptions);
//   }