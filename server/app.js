require('dotenv').config()
const express = require('express')
const app = express();
const router = require('./routes')
const PORT = 3000;
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foodgasm', {useNewUrlParser:true})

//body parser
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(PORT, () => {
    console.log('app is listening on port ,', PORT)
})


