const router = require("express").Router()
const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports = async (err,res,req,next)=>{
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(401).json("Not authorize");
        }
        const payload = await jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
    } catch (err) {
        console.error(err.message)
        return res.status(401).json("Not authorized");
    }
    next();
};