const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const { uploadImage } = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// @route   POST /api/upload
// @desc    Upload image file
// @access  Private (authenticated users)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }), 
  upload.single('image'),
  uploadImage
);

module.exports = router;
