const medicineService = require("../services/medicine-service")

const medicineController = {}



medicineController.getallMedicine = async ( req, res, next ) => {
   try {
       const result = await medicineService.getallMedicine()
       res.status(200).json( result )
   } catch (err) {
       next(err)
   }
}

medicineController.adminGetallMedicine = async ( req, res, next ) => {
   try {
       const result = await medicineService.adminGetallMedicine()
       res.status(200).json( result )
   } catch (err) {
       next(err)
   }
}


medicineController.createMedicine = async ( req, res, next ) => {
   try {
      req.body.price = +req.body.price
      req.body.stock = +req.body.stock
      const data = req.body

      console.log(data)

      const result = await medicineService.createMedicine(data)
      res.status(201).json( result )
   } catch (err) {
       next(err)
   }
}



medicineController.updateMedicineById = async (req, res, next) => {
   try {
      const data = req.body
      const id = +req.body.id

      data.stock = +data.stock

      const result = await medicineService.updateMedicineById(id, data)

      res.status(201).json(result)
   } catch (err) {
      next(err)
   }
}



module.exports = medicineController