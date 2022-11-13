const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports = async (res,req,next)=>{
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("Not authorize");
        }
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
    } catch (err) {
        console.error(err.message)
        return res.status(403).json("Not authorized");
    }
};