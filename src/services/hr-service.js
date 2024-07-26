const transporter = require('../config/emailHr');

const hrService = {};

hrService.sendEmail = (attachmentPath, attachmentFilename, data) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.GMAIL_HR,
            to: 'medisyncweb@gmail.com',
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
                console.log('Error sending email:', error);
                reject(error);
            } else {
                console.log('Message sent: %s', info.messageId);
                resolve(info);
            }
        });
    });
};

module.exports = hrService;
