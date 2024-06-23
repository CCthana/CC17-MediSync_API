const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();

// ให้ Express.js เสนอไฟล์ในโฟลเดอร์ public
app.use(express.static('public'));

app.get('/pdf', (req, res) => {
  const doc = new PDFDocument();
  const filePath = './public/output.pdf';

  doc.pipe(fs.createWriteStream(filePath));
  
  // สร้างเนื้อหา HTML ในไฟล์ PDF
  doc.text("");
  
  doc.end();
  res.send('PDF generated!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});