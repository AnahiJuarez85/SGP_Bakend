const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/javascript', 'text/javascript', 'image/png', 'image/jpeg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'));
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = upload;
