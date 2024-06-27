const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const password = bcrypt.hashSync("123456");

// const UserData = [
//   {
//     hn: "HN23456",
//     password:"123456",
//     firstName: "อรชุน",
//     lastName: "ปาณฑพ",
//     phone: "086-312-4455",
//     email: "arjuna@gmail.com",
//     address: "37/278 twaparayuga soi 33 intrapat intrapat hastinapura 10710",
//     birthDate: new Date("1986-02-17"),
//     nationality: "india",
//     gender: "MALE",
//     drugAllergies: "none",
//   },
//   {
//     hn: "HN23457",
//     password:"123456",
//     firstName: "ราม",
//     lastName: "สุริยะวง",
//     phone: "086-711-2222",
//     email: "rama@gmail.com",
//     address: "30/171 tetrayuga soi 22 ayodhaya ayodhaya kosla 10173",
//     birthDate: new Date("1966-03-21"),
//     nationality: "india",
//     gender: "MALE",
//     drugAllergies: "none",
//   },
//   {
//     hn: "HN23458",
//     password:"123456",
//     firstName: "รพิณ",
//     lastName: "ไพรวัล",
//     phone: "091-626-7314",
//     email: "rapin@gmail.com",
//     address: "21/384 prauma soi 3 mahaka mahaka chiangmai 12120",
//     birthDate: new Date("1990-05-19"),
//     nationality: "thai",
//     gender: "MALE",
//     drugAllergies: "none",
//   },
//   {
//     hn: "HN23459",
//     password:"123456",
//     firstName: "อิเหนา",
//     lastName: "วงศ์ชวา",
//     phone: "02-861-9919",
//     email: "chavapri@gmail.com",
//     address: "21/331 chwa soi 4 garuda garuda indo 12130",
//     birthDate: new Date("1990-02-20"),
//     nationality: "indo",
//     gender: "MALE",
//     drugAllergies: "paracetamol",
//   },
//   {
//     hn: "HN23460",
//     password:"123456",
//     firstName: "แดง",
//     lastName: "พระขโนง",
//     phone: "999-999-9999",
//     email: "abomination@gmail.com",
//     address: "21/733 ratha soi 5 prakanong prakaomg bangkok 12310",
//     birthDate: new Date("1986-06-30"),
//     nationality: "thai",
//     gender: "MALE",
//     drugAllergies: "none",
//   },
//   {
//     hn: "HN23461",
//     password:"123456",
//     firstName: "วาสุเทพ",
//     lastName: "จันทรวง",
//     phone: "081-224-1121",
//     email: "Narayan@gmail.com",
//     address: "00/000 twaparayuga soi 7 gogul gogul twaraga 12120",
//     birthDate: new Date("1980-05-14"),
//     nationality: "india",
//     gender: "MALE",
//     drugAllergies: "none",
//   },
//   {
//     hn: "HN23462",
//     password:"123456",
//     firstName: "นางสาวแสงโสม",
//     lastName: "วงสุรา",
//     phone: "086-217-3399",
//     email: "alcoholBlue@gmail.com",
//     address: "17/221 laokao soi 4 rumthai rumthai bankok 10180",
//     birthDate: new Date("1986-05-17"),
//     nationality: "thai",
//     gender: "FEMALE",
//     drugAllergies: "paracetamol",
//   },
// ];


// const clinicData = [
//   {
//     name: "ศูนย์รักษาโรคหลอดเลือดหัวใจตีบแบบซับซ้อน",
//     detail: "ให้การปรึกษาแก่ผู้ป่วยที่ต้องการหาทางเลือกการรักษาภาวะหลอดเลือดหัวใจตีบ นอกเหนือจากการผ่าตัด รวมทั้งให้การรักษาโรคหลอดเลือดหัวใจตีบ",
//     image: "https://www.svgrepo.com/svg/325928/heart-cardiogram"
//   },
//   {
//     name: "ศูนย์โรคปอดและโรคระบบทางเดินหายใจ",
//     detail: "อาการหายใจลำบาก ไอ แน่นหน้าอก หรือเสมหะมีเลือดปน",
//     image: "https://www.svgrepo.com/svg/494374/heart-lung"
//   },
//   {
//     name: "ศูนย์โรคไต",
//     detail: "ประกอบด้วยทีมผู้เชี่ยวชาญในแต่ละด้าน ได้แก่ ทีมอายุรแพทย์โรคไต ศัลยแพทย์ผ่าตัดปลูกถ่ายไต ศัลยแพทย์หลอดเลือด ศัลยแพทย์ระบบทางเดินปัสสาวะ อายุรแพทย์โรคติดเชื้อ แพทย์เฉพาะทางอายุรศาสตร์โรคหัวใจและหลอดเลือด อายุรแพทย์โรคทางเดินหายใจ แพทย์ผู้เชี่ยวชาญทางด้าน ICU ทีมจิตแพทย์ผู้เชี่ยวชาญด้านการประเมินสภาพจิตใจของผู้ป่วยปลูกถ่ายไต ทีมแพทย์เอกซเรย์ที่ชำนาญการวินิจฉัยด้านการผ่าตัดปลูกถ่ายไต ฯลฯ อีกทั้งแพทย์สาขาอื่นๆ",
//     image: "https://www.svgrepo.com/svg/88518/kidney"
//   },
//   {
//     name: "ศูนย์หู คอ จมูก",
//     detail: "ให้บริการตรวจวินิจฉัยและรักษาอาการที่เกี่ยวข้องกับหู คอ และจมูกทุกชนิด ทั้งในเด็กและผู้ใหญ่ ครอบคลุมตั้งแต่การให้คำปรึกษาไปจนถึงการผ่าตัดในโรคที่ซับซ้อน",
//     image: "https://www.svgrepo.com/svg/399511/i-ear-nose-throat"
//   },
//   {
//     name: "ศูนย์ภูมิแพ้",
//     detail: "ให้บริการดูแลผู้ป่วยโรคภูมิแพ้ โรคหืดแบบเฉพาะเจาะจง (personalized treatment) อย่างครบถ้วน ตั้งแต่การป้องกันโรค การรักษาพยาบาล การฟื้นฟูและการติดตามผลการรักษาด้วยเครื่องมือที่ทันสมัยและเทคโนโลยีดิจิตอลในการดูแลผู้ป่วย",
//     image: "https://www.svgrepo.com/svg/313457/allergies-solid"
//   },
//   {
//     name: "ศูนย์กุมารเวช",
//     detail: "ดูแลสุขภาพเด็กอย่างครบวงจรโดยกุมารแพทย์และแพทย์ผู้เชี่ยวชาญเด็กทุกสาขา พร้อมให้บริการตรวจสุขภาพ ฉีดวัคซีน ตรวจรักษาโรคเด็กตามอาการป่วย",
//     image: "https://www.svgrepo.com/svg/483853/25-baby-s"
//   },
//   {
//     name: "รังสีวินิจฉัย และเวชศาสตร์นิวเคลียร์",
//     detail: "ให้บริการตรวจวินิจฉัยและรักษาโรค ด้วยเครื่องมือทางรังสีวิทยาที่มีคุณภาพด้วยวิธีการที่ได้มาตรฐาน ถูกต้อง และแม่นยำ ภายใต้การดูแลของรังสีแพทย์และบุคลากรทางการแพทย์ที่มีความสามารถเพื่อให้ได้ภาพที่สามารถใช้ในการวินิจฉัยและรักษาโรค รวมทั้งปลอดภัยต่อผู้รับบริการ โดยเทคโนโลยีระบบจัดการข้อมูลภาพรังสีดิจิตอล PACS (Picture Archiving and Communication System)",
//     image: "https://www.svgrepo.com/svg/339688/x-ray-01"
//   },
//   {
//     name: "แผนกผู้ป่วยหนัก (ICU)",
//     detail: "ทีมสหแพทย์ทุกสาขาที่พร้อมดูแลผู้ป่วยตลอด 24 ชั่วโมง เพื่อรับมือกับสถานการณ์วิกฤตที่ไม่คาดคิดที่เกิดขึ้นได้ตลอดเวลา โดยยึดหลักการทำงานเป็นทีมอย่างมีระบบประกอบกับความชำนาญและประสบการณ์การใช้เครื่องมืออุปกรณ์อย่างมีประสิทธิภาพ ทั้งหมดนี้คือความพร้อมของบำรุงราษฎร์ที่จะส่งมอบการดูแลรักษาให้แก่ผู้ป่วยในระยะเวลาอันรวดเร็ว",
//     image: "https://www.svgrepo.com/svg/399531/i-intensive-care"
//   },
//   {
//     name: "ฝ่ายเภสัชกรรม",
//     detail: "บริการจ่ายยา พร้อมให้คำแนะนำโดยเภสัชกรที่เชี่ยวชาญในสาขาต่างๆ",
//     image: "https://www.svgrepo.com/svg/115073/medicines"
//   },
//   {
//     name: "อายุรกรรม",
//     detail: "ชำนาญการตรวจวินิจฉัย สามารถรักษาโรคทั่วไป ตลอดจนโรคที่ซับซ้อน ครอบคลุมทั้งโรคเฉียบพลัน และเรื้อรัง ภายใต้การดูแลที่ได้มาตรฐานสากล มีอายุรแพทย์ผู้เชียวชาญหลากหลายสาขา ร่วมกับทีมสหวิชาชีพ ซึ่งดูแลผู้ป่วยแบบองค์รวม ให้การรักษาด้วยยาภายใต้การดูแลของแพทย์ พยาบาล และเภสัชกรผู้มากประสบการณ์ อาศัยเครื่องมือทางการแพทย์ที่ทันสมัย",
//     image: "https://www.svgrepo.com/svg/399554/internal-medicine"
//   },
// ];

const doctorData = [
  {
    clinicId: 1,
    firstName: "นายศรีวิชัย",
    lastName: "บุญพิทักษ์",
    birthDate: new Date("1981-02-12"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/0380a9422c5afcb91071754c083e9931"
  },
  {
    clinicId: 2,
    firstName: "นายธวัชไชย",
    lastName: "พรหมส่ง",
    birthDate: new Date("1892-03-05"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/d5b127bfe6d7c5b2b4dc9189e72f21f0"
  },
  {
    clinicId: 3,
    firstName: "นางอัญชา",
    lastName: "รัตนะแสง",
    birthDate: new Date("1931-06-07"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/fed465cee4ec8ce78409ade3732dfbe3"
  },
  {
    clinicId: 4,
    firstName: "นางเพ็ญศรี",
    lastName: "อายุวัฒ",
    birthDate: new Date("1926-07-06"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/d9ab2e87ab8770a19f0e8a2130fda3f7"
  },
  {
    clinicId: 5,
    firstName: "นางจิตดี",
    lastName: "สมประสงค์",
    birthDate: new Date("1941-03-12"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/a8919562f87124b9d249b4392ec08dd7"
  },
  {
    clinicId: 6,
    firstName: "นายธารา",
    lastName: "ณกรุงเก่า",
    birthDate: new Date("1967-06-30"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/a4b42d6cf6c22ce6cada39c3d947d7f1"
  },
  {
    clinicId: 7,
    firstName: "นายประสงค์",
    lastName: "ศรีบุญญา",
    birthDate: new Date("1897-07-20"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/73fae1c67b96091490d6739738e78b07"
  },
  {
    clinicId: 8,
    firstName: "นางสุนี",
    lastName: "มหาธาตุ",
    birthDate: new Date("1899-05-04"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/1644cf94a7b5669efcf156df79c51b8d"
  },
  {
    clinicId: 9,
    firstName: "นางไพรศรี",
    lastName: "แสงพนา",
    birthDate: new Date("1987-06-05"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/21f1c0217eb7a1bb55dc579ad133e6d1"
  },
  {
    clinicId: 10,
    firstName: "นายสิง",
    lastName: "หฤทัยกล้า",
    birthDate: new Date("1981-10-05"),
    education: "ศิริราช",
    image: "https://asset.cloudinary.com/djncnn93v/efd34aac65abf282549d532a825e22f1"
  }
];

// const visitorNumberData = [
//     {
//       hn: "HN23456",
//       clinicId: 5,
//       doctorId: 5,
//       vn: "VN1347",
//       weight: 79,
//       height: 185,
//       heartRate: 45,
//       bloodPreasure: "80/120",
//       temperature: 37,
//       symptoms: "หายใจติดขัดมีผื่นขึ้น",
//       treatmentResult: "ทำการทดสอบภูมิแพ้",
//       diagnosis: "แพ้ฝุ่น",
//       medicine: "chlorpheniramine",
//       totalPrice: 2000,
//       vnType: "OPD"
//     },
//     {
//       hn: "HN23457",
//       clinicId: 1,
//       doctorId: 1,
//       vn: "VN1348",
//       weight: 80,
//       height: 187,
//       heartRate: 90,
//       bloodPreasure: "110/180",
//       temperature: 38,
//       symptoms: "เจ็บหน้าอก ใจสั่น",
//       treatmentResult: "ทำCT Scan",
//       diagnosis: "เส้นเลือดหัวใจตีบ",
//       medicine: "none",
//       totalPrice: 200000,
//       vnType: "ADMIT"
//     },
//     {
//       hn: "HN23458",
//       clinicId: 2,
//       doctorId: 2,
//       vn: "VN1349",
//       weight: 66,
//       height: 165,
//       heartRate: 45,
//       bloodPreasure: "82/122",
//       temperature: 37.5,
//       symptoms: "มีีไข้ ไอมีกลิ่นเหม็น เสมหะมีสีและกลิ่นผิดปกติ",
//       treatmentResult: "X-rayปอด",
//       diagnosis: "ฝีหนองในปอด",
//       medicine: "ยาปฏิชีวนะ ceftriaxone/clindamycin",
//       totalPrice: 150000,
//       vnType: "OPD"
//     },
//     {
//       hn: "HN23459",
//       clinicId: 8,
//       doctorId: 8,
//       vn: "VN1350",
//       weight: 67,
//       height: 165,
//       heartRate: 65,
//       bloodPreasure: "85/130",
//       temperature: 40,
//       symptoms: "มีอาการชักเกร็ง",
//       treatmentResult: "ตรวจสอบสารตกค้างในช่องปาก",
//       diagnosis: "พบสารพิษจำพวกยาฆ่าแมดงในร่างกาย",
//       medicine: "none",
//       totalPrice: 6000,
//       vnType: "ADMIT"
//     },
//     {
//       hn: "HN23460",
//       clinicId: 6,
//       doctorId: 6,
//       vn: "VN1351",
//       weight: 40,
//       height: 150,
//       heartRate: 80,
//       bloodPreasure: "80/120",
//       temperature: 39,
//       symptoms: "ถ่ายอุจาระเหลว",
//       treatmentResult: "ผลตรวจจากการเจาะเลือด",
//       diagnosis: "ท้องร่วง",
//       medicine: "imodium",
//       totalPrice: 2000,
//       vnType: "OPD"
//     },
//     {
//       hn: "HN23461",
//       clinicId: 10,
//       doctorId: 10,
//       vn: "VN1352",
//       weight: 80,
//       height: 187,
//       heartRate: 45,
//       bloodPreasure: "80/120",
//       temperature: 40,
//       symptoms: "ปวดหัว ตัวร้อน",
//       treatmentResult: "ตรวจโดยชุดตรวจไข้หวัดใหญ่",
//       diagnosis: "ไข้หวัดใหญ่สายพันธุ์A",
//       medicine: "Tamiflu",
//       totalPrice: 1500,
//       vnType: "OPD"
//     },
//     {
//       hn: "HN23462",
//       clinicId: 3,
//       doctorId: 3,
//       vn: "VN1353",
//       weight: 54,
//       height: 153,
//       heartRate: 79,
//       bloodPreasure: "90/140",
//       temperature: 37,
//       symptoms: "ปัสสาวะมีเลือด",
//       treatmentResult: "X-rayช่องท้อง",
//       diagnosis: "นิ่วในไต",
//       medicine: "none",
//       totalPrice: 50000,
//       vnType: "OPD"
//     }
//   ];

//   const appointmentData = [
//     {
//       hn: "HN23456",
//       doctorId: 5,
//       appointmentTime: new Date("2024-07-18T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23457",
//       doctorId: 1,
//       appointmentTime: new Date("2024-06-26T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23458",
//       doctorId: 2,
//       appointmentTime: new Date("2024-12-06T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23459",
//       doctorId: 8,
//       appointmentTime: new Date("2024-08-05T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23460",
//       doctorId: 6,
//       appointmentTime: new Date("2024-09-06T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23461",
//       doctorId: 10,
//       appointmentTime: new Date("2024-08-13T00:00:00Z"),
//       status: "PENDING"
//     },
//     {
//       hn: "HN23462",
//       doctorId: 3,
//       appointmentTime: new Date("2024-09-10T00:00:00Z"),
//       status: "PENDING"
//     }
//   ];



  const adminData = [
    {
      userName: "Acount",
      password: "654321",
      role: "ACCOUNT"
    },
    {
      userName: "Doctor",
      password: "654321",
      role: "DOCTOR"
    },
    {
      userName: "Nurse",
      password: "654321",
      role: "NURSE"
    },
    {
      userName: "Reception",
      password: "654321",
      role: "RECEPTION"
    },
    {
      userName: "Admin",
      password: "654321",
      role: "ADMIN"
    }
  ];


const run = async () => {
  try {
    // await prisma.admin.createMany({data:adminData});
    // console.log("admins seeded sucessfull");

    // await prisma.appointment.createMany({data:appointmentData});
    // console.log("Appointments seeded successfull.");

    // await prisma.visitorNumber.createMany({data:visitorNumberData});
    // console.log("Visitors seeded successfully.");

    // await prisma.user.createMany({ data: UserData });
    // console.log("Users seeded successfully.");

    // await prisma.clinic.createMany({ data: clinicData });
    // console.log("Clinics seeded successfully.");

    // await prisma.doctor.createMany({ data: doctorData });
    // console.log("Doctors seeded successfully.");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

run();


