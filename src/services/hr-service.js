const transporter = require('../config/emailHr')

const hrService = {}

hrService.sendEmail = (attachmentPath, attachmentFilename, data) => {

    const mailOptions = {
        from: process.env.GMAIL_HR,
        to: 'gecko.jeng@gmail.com',
        subject: `สมัครงานตำแหน่ง ${data.position}`,
        html: `<p>ชื่อผู้สมัคร: <strong>${data.firstname} ${data.lastname}</strong> อายุ <strong>${data.age}</strong></p>
            <p>Email: <strong>${data.email}</strong></p><p>เบอร์ติดต่อ: <strong>${data.phone}</strong></p>
            <p>ต้องการสมัครงานตำแหน่ง: <strong>${data.position}</strong></p>
            <p>รายละเอียดเพิ่มเติม: <strong>${data.detail}</strong></p>`,
        attachments: [
            {
                filename: attachmentFilename,
                path: attachmentPath
            }
        ]
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = hrService;