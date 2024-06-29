require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundMiddlwware = require('./src/middlewares/not-found');
const errorMiddleware = require('./src/middlewares/error');
const limiter = require('./src/middlewares/rate-limit');

const adminRouter = require('./src/routes/admin-route');
const clinicRouter = require('./src/routes/clinic-route');
const doctorRouter = require('./src/routes/doctor-route');
const receptionRouter = require('./src/routes/reception-route');
const hnRouter = require('./src/routes/hn-route');
const vnRouter = require('./src/routes/vn-route');
const nurseRouter = require('./src/routes/nurse-route');
const adminDoctorRouter = require('./src/routes/adminDoctor-route');
const accountRouter = require('./src/routes/account-route');


const userRouter = require('./src/routes/user-route');
const authenticateAdmin = require('./src/middlewares/authenticateAdmin');


const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());

// path admin potect
app.use('/admin', adminRouter)
app.use('/reception',authenticateAdmin ,receptionRouter)
app.use('/nurse', authenticateAdmin, nurseRouter)
app.use('/adminDoctor', authenticateAdmin, adminDoctorRouter)
app.use('/account', authenticateAdmin, accountRouter)
app.use('/hn', authenticateAdmin, hnRouter)
app.use('/vn', authenticateAdmin, vnRouter)

// path public
app.use('/clinic', clinicRouter)
app.use('/doctor', doctorRouter)

app.use('/user', userRouter)

app.use(notFoundMiddlwware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server running at ${PORT}`))