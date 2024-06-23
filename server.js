require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundMiddlwware = require('./src/middlewares/not-found');
const errorMiddleware = require('./src/middlewares/error');
const limiter = require('./src/middlewares/rate-limit');

const userRouter = require('./src/routes/user-route');
const adminRouter = require('./src/routes/admin-route');



const app = express();
app.use(express.json());



app.use(cors());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());


app.use('/user', userRouter)


app.use(notFoundMiddlwware);
app.use(errorMiddleware);



const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server running at ${PORT}`))