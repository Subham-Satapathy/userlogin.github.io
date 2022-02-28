const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("Connection is successful");
}).catch((err)=>{
    console.log("Connection is not successful");
});