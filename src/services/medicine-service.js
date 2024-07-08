const prisma = require('../models/prisma')
const medicineService = {}

medicineService.createMedOrderAndUpdateVN = async (vnData, doctorId, med, id) => {
   return  prisma.$transaction(async(tx) => { 
      
      await tx.visitorNumber.update({
         where: {id: id},
         data: vnData
      })
      
      const medUpdateData = med.map((item) => {
         return {id: +item.medicineId, stock: +item.quantity}
      })
      
      await Promise.all(medUpdateData.map((item) => tx.medicine.update({
         where: {id: item.id}, 
         data: {
         stock:{ decrement: +item.stock }
         }}) 
      ));
      
      const data = med.map(item => {
      return {medicineId: +item.medicineId, quantity: +item.quantity,  vn: vnData.vn}
      })

      await tx.MedicineOrder.createMany({data})
      
      
   },
   
)
  
   return
  
}


medicineService.getallMedicine = () => {
   return prisma.medicine.findMany({
      where: {
         stock: {
           gt: 0 
         }
       }
   });
}

medicineService.adminGetallMedicine = () => {
   return prisma.medicine.findMany();
}

medicineService.updateMedicineById = (id, data) => {
   return prisma.medicine.update({
      where: {id: id},
      data
   })
}



medicineService.createMedicine = (data) => {
   return prisma.medicine.create({data})
}





module.exports = medicineService