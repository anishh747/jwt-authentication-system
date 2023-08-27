//Auth user/set token 

import expressAsyncHandler from "express-async-handler";

const registerUser = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({mesage:"REgister User"})

});


//public route
const authUser = expressAsyncHandler(async(req,res) =>{
    res.status(200).json({mesage:"Authorize User"})

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