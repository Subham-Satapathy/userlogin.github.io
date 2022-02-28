const express = require('express');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');
// router.get('/signup', (req,res)=>{
//     res.send("Signup page");
// });

// router.get('/login', (req,res)=>{
//     res.send("Login page");
// });

router.post('/signup', async (req,res)=>{
    const {username, email, password, cpassword} = req.body;
    if(!username|| !email|| !password || !cpassword){
        return res.status(428).json({
            error:"Fill all mandatory fields"
        })
    }
    

    try {
       const userEmail  = await User.findOne({email:email})
        if(userEmail){
        return res.status(451).json({
            error:"User already exists"
        })
        }
        else if(password!=cpassword){
            return res.status(422).json({
                error:"Password does not match"
            })
        }else{
            const user = new User({username, email, password, cpassword});
        //password hashing
        
        await user.save();
        res.status(200).json({
            message: "User registered successfully"
        })
        }
        
    }catch(err){
        console.log(err);
    }
    
})
//login 
router.post('/signin', async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                error:"Enter email or password"
            });
        }
        else{
            const userData = await User.findOne({email:email});
            if(userData){
                const isMatched = await bcrypt.compare(password, userData.password);
                if(isMatched){
                    res.status(200).json({
                        mes:"Auth successful"
                    })
                }else{
                    res.status(421).json({err:"Invalid email or password"})
                }
            }else{
                res.status(421).json({err:"Invalid email or password"})
            }
            
        
        }
        
    }catch(err){
        console.log(err);
    }
})

router.get('/users', async (req,res)=>{
    let users = await User.find();
    console.log(users);
    if(users.length > 0){
        res.status(200).send(users);
    }else{
        res.status(400).json({
            mes:"No data found"
        });
    }
})

router.put('/update/:id', async (req,res)=>{
    try{
        let users = await User.updateOne(
            {_id: req.params.id},
            {
                $set: req.body
        });
        console.log(users);
        res.status(200).json({
            mes:"Updated successfully"
        })
    }catch(e){
        res.status(400).json({
            mes:"Could not update"
        })
    }
    
})
module.exports = router;