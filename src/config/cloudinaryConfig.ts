import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Replace with your Cloudinary API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product-images', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  }as any,
});

const upload = multer({ storage });

export default upload;

