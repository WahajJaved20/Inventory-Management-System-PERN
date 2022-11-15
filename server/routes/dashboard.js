const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (err,res,req,next)=>{
    try {
        //req.users has the payload
        res.json(req.user)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
    next();
});

module.exports= router;