import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Replace with your Cloudinary API secret
});

// Configure multer to use Cloudinary storage
// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'health-reports', // Folder in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
    } as Record<string, any> // Explicitly type params to avoid TypeScript error
  });

const upload = multer({ storage });
  
export default upload;

