import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: './src/app/uploads',
  filename: function(req, file, cb) {
    const buffer = crypto.pseudoRandomBytes(16);
    cb(null, buffer.toString('hex') + file.originalname);
  },
});


export default storage;
