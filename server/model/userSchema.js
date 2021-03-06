const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    console.log("HEllo");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.password, 12);
    }
    next();
})

const User = mongoose.model('REGISTRATION', userSchema);
module.exports = User;