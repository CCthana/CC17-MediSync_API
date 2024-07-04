const hrService = require("../services/hr-service");

const hrController = {}

hrController.sendEmail = async (req, res, next) => {
    try {
        const data = req.body;
        console.log("req.files sendEmail", req.files.cv[0]);

        const attachmentPath = req.files.cv[0].path;
        const attachmentFilename = req.files.cv[0].originalname;

        hrService.sendEmail(attachmentPath, attachmentFilename, data)
        res.status(200).json({ message: 'send Email success'})
        
    } catch (err) {
        console.log('err sendEmail', err)
    }
}

module.exports = hrController;