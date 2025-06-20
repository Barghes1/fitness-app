const path = require('path');

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не надано' });
  }

  const fileUrl = `/uploads/${req.file.filename}`; 
  res.json({ imageUrl: fileUrl });
};
