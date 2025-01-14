import express from 'express';
import { addEvent, getEvents, deleteEvent } from '../controller/event.controller';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/', // Temporary storage before uploading to Cloudinary
  fileFilter: (req, file, cb) => {
    // Accept only JPG, JPEG, and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only JPG, JPEG, and PNG files are allowed')); // Reject the file
    }
  },
});

const router = express.Router();

// Route to add a new event
router.post('/add',upload.single('image'), addEvent);

// Route to fetch all events
router.get('/list', getEvents);

// Route to delete an event by ID
router.delete('/delete/:eventId', deleteEvent);

export default router;
