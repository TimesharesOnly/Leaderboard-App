const fs = require('fs');
const path = require('path');

exports.uploadImage = (req, res) => {
    if (req.file == undefined) {
      res.status(400).json({ success: false, message: 'No file selected!' });
    } else {
      res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
    }
  };
  

  
exports.deleteImage = (req, res) => {
  const { filePath } = req.body;
    const fullPath = path.join(__dirname, '..', filePath); 
  
  fs.unlink(fullPath, (err) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Failed to delete the file" });
    }
    res.status(200).json({ success: true, message: "File deleted successfully" });
  });
  }; 