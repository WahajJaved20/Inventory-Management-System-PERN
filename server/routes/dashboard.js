const router = require("express").Router()
const pool = require("../db")
const authorization = require('../middleware/authorization')
const { json } = require("express")


router.get("/", authorization, async(req,res)=>{
    try {
        res.json(req.user_id)
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
}) 

module.exports = router;