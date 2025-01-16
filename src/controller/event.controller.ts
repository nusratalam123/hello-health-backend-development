import { Request, Response } from 'express';
import { Event } from '../model/event.model';
import cloudinary from 'cloudinary';


// Controller to add a new event
export const addEvent = async (req: Request, res: Response) => {
  try {
    const { date, title, description } = req.body;

    // Validate required fields
    if (!date || !title || !description) {
      return res.status(400).json({ message: 'Date, title, description, and image are required' });
    }

     // Check if Multer threw a file type error
     if (!req.file) {
        return res.status(400).json({ message: 'Only JPG, JPEG, and PNG files are allowed' });
      }
  
      // // Upload image to Cloudinary
      // const result = await cloudinary.v2.uploader.upload(req.file.path);
      // const imageUrl = result.secure_url;
  

    const event = new Event({ date, title, description, image: req.file.path });
    await event.save();

    res.status(201).json({ message: 'Event added successfully', event });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to fetch all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // Sort events by latest
    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
