import multer from "multer";
import path from "path";

// Hum memory storage use karenge taaki file seedha buffer mein aaye (Cloudinary ke liye best hai)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Sirf images (jpeg, jpg, png, webp) allowed hain!"), false);
    }
};

export const singleUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
}).single("logo"); // Frontend mein field ka naam 'logo' hona chahiye