//Auth user/set token 

import { pool } from "../db.js"; 
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const createRoom = expressAsyncHandler(async(req,res) =>{
    // res.status(200).json({mesage:"REgister User"})
    let {room_id, host} = req.body;
    const createTableForRoom = await pool.query("CREATE TABLE room_($1)(owner varchar",[email])
    if (checkUser.rowCount !== 0) {
        res.status(400);
        throw new Error("USER ALREADY EXISTS")
    }else{
        const register = await pool.query("INSERT INTO users (email, name,password) VALUES ($1,$2,$3) ",[email,name,password])
        const user = await pool.query("SELECT id FROM users WHERE email = ($1)",[email])
        generateToken(res, user.rows.id);
        res.json(register);
    }

});


//public route
const joinRoom = expressAsyncHandler(async(req,res) =>{
    const {email,password} = req.body;
    const checkUser = await pool.query("SELECT id FROM users WHERE email = ($1)",[email])
    if (checkUser.rowCount !== 0) {
        const userDetails = await pool.query("SELECT * FROM users WHERE email = ($1)",[email])
        if (await bcrypt.compare(password,userDetails.rows[0].password)) {
            generateToken(res,checkUser.rows[0].id)
            res.status(201)
            res.json(userDetails)
        }else{
            res.status(401)
            throw new Error("Invalid Email or Password")
        }
    }else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
});


const endRoom = expressAsyncHandler(async(req,res) =>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: "Logged Out Successfully"})
});

const inviteRoom = expressAsyncHandler(async(req,res) =>{
    console.log(req.user)
    res.status(200).json({mesage:"getUserProfile"})

});

export  {createRoom, endRoom, joinRoom, inviteRoom};