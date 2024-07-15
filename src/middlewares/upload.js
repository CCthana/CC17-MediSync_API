const multer = require('multer');

const storage =  multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/images');
   },
   filename: (req, file, cb) => {
      console.log('file', file)
      const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split('/')[1]}`;
      
      cb(null, filename)
   },
})

const upload = multer({ storage });

module.exports = upload;