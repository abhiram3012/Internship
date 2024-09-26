const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const {username , email , password} = req.body
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await user.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ",hashedPassword);
    const User = await user.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${User}`);
    if(User){
        res.status(201).json({_id: User._id, email:User.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message : "Register the user"});
});

//@desc login of a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const{email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mondatory");
    }
    const usr = await user.findOne({email});
    //compare password with hashed password
    if(usr && (await bcrypt.compare(password, usr.password))){
        const accessToken = jwt.sign({
            usr: {
                username: usr.username,
                email : usr.email,
                id: usr.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json((accessToken))
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({message : "Login user"});
});

module.exports = {registerUser, loginUser};
