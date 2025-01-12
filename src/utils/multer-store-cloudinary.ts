import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'health-reports',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    } as any
  });

const upload = multer({ storage });

export default upload;
