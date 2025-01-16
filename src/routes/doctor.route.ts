import express from 'express';
import { getDoctors, addDoctor, getSingleDoctor } from '../controller/doctor.controller';
import multer from 'multer';
import upload from '../config/cloudinaryConfig';

// const upload = multer({
//   dest: 'uploads/', // Temporary storage before uploading to Cloudinary
//   fileFilter: (req, file, cb) => {
//     // Accept only JPG, JPEG, and PNG files
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true); // Accept the file
//     } else {
//       cb(new Error('Only JPG, JPEG, and PNG files are allowed')); // Reject the file
//     }
//   },
// });

const router = express.Router();

// Route to fetch all doctors
router.get('/list', getDoctors);

// Route to fetch a single doctor by ID
router.get('/single/:doctorId', getSingleDoctor);

// Route to add a new doctor with image upload
router.post('/add', upload.single('image'), addDoctor);

// router.post('/submit', upload.single('report'), submitHealthData);


export default router;
