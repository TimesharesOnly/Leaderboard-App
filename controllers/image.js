exports.uploadImage = (req, res) => {
    if (req.file == undefined) {
      res.status(400).json({ success: false, message: 'No file selected!' });
    } else {
      res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
    }
  };
  