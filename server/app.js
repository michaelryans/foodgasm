require('dotenv').config()
const express = require('express')
const app = express();
const router = require('./routes')
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_URL||'mongodb://localhost/foodgasm', {useNewUrlParser:true})
const errorHandler = require('./middlewares/errorHandling')

const morgan = require('morgan');

//body parser
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("tiny"))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('app is listening on port ,', PORT)
})


