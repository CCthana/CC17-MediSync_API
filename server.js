require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFoundMiddlwware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const limiter = require('./middlewares/rate-limit');


const app = express();
app.use(express.json());



app.use(cors());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());




app.use(notFoundMiddlwware);
app.use(errorMiddleware);



const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server running at ${PORT}`))