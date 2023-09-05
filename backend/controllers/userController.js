//Auth user/set token 

import { pool } from "../db.js"; 
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const registerUser = expressAsyncHandler(async(req,res) =>{
    // res.status(200).json({mesage:"REgister User"})
    const {email,name} = req.body;
    const checkUser = await pool.query("SELECT * FROM users WHERE email = ($1)",[email])
    if (checkUser.rowCount !== 0) {
        res.status(400);
        res.send("USER ALREADY EXISTS")
    }else{
        const register = await pool.query("INSERT INTO users (email, name) VALUES ($1,$2) ",[email,name])
        const user = await pool.query("SELECT id FROM users WHERE email = ($1)",[email])
        generateToken(res, user.rows.id);
        res.json(register);
    }

});


//public route
const authUser = expressAsyncHandler(async(req,res) =>{
    const allUsers = await pool.query("SELECT * FROM users")
    res.json(allUsers)
});


const logOutUser = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({mesage:"log Out User"})

});

const getUserProfile = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({mesage:"getUserProfile"})

});

const updateProfile = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({mesage:"updateProfie"})

});
export  {authUser,registerUser,logOutUser,getUserProfile,updateProfile};