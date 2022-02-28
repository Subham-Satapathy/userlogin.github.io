const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config({path : './config.env'});
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;

app.listen(5000, ()=>{
    console.log(`Server is running at ${PORT}`);
})