const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Register a admin
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const {username , emailId , password} = req.body
    if(!username || !emailId || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await Admin.findOne({emailId});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ",hashedPassword);
    const User = await Admin.create({
        username,
        emailId,
        password: hashedPassword,
    });

    console.log(`User created ${User}`);
    if(User){
        res.status(201).json({_id: User._id, emailId:User.emailId});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc login of a Admin
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const{emailId, password} = req.body;
    if(!emailId || !password){
        res.status(400);
        throw new Error("All fields are mondatory");
    }
    const usr = await Admin.findOne({emailId});
    //compare password with hashed password
    if(usr && (await bcrypt.compare(password, usr.password))){
        const accessToken = jwt.sign({
            usr: {
                username: usr.username,
                emailId : usr.emailId,
                id: usr.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({id:usr.id,emailId:usr.emailId,username:usr.username,accessToken:accessToken})
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

module.exports = {registerUser, loginUser};
