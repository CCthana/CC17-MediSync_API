const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const accountController = {}

accountController.updateTotalPriceVnByVn = async (req, res, next) => {
    try {
      console.log(req.files);
      if (!req.files || Object.keys(req.files).length === 0) {
        throw createError(400, "Files are required");
      }
  
      const pdfUrls = {};
      for (const field in req.files) {
        const file = req.files[field][0];
        const pdfUrl = await uploadService.upload(file.path);
        pdfUrls[field] = pdfUrl;
      }
  
      const id = parseInt(req.body.id);
      const totalPrice = parseFloat(req.body.totalPrice);
  
      const summaryUrl = pdfUrls["medicalCertificate"];
      const recieptUrl = pdfUrls["receipt"];
  
      // Data to be updated in the visitor number table
      const updateData = {
        totalPrice: totalPrice,
        status: "COMPPELETED",
        summary: summaryUrl,
        recipt: recieptUrl,
      };
  
      // Update visitornumber table using vnService
      const updatedVisitorNumber = await vnService.updateVnByVn(id, updateData);
  
      
      res.status(200).json({ updateVn: updatedVisitorNumber, pdfUrls });
    } catch (err) {
      next(err);
    } finally {
      if (req.files) {
        for (const field in req.files) {
          const file = req.files[field][0];
          await fs.unlink(file.path);
        }
      }
    }
  };
  
module.exports = accountController