const router = require("express").Router()
const { json } = require("express");
const pool = require("../db")
//register 

router.post("/register", async(req,res)=>{
    try {
         
        const {name,email,password} = req.body;

        const user = await pool.query("SELECT * FROM ADMIN WHERE ADMIN_EMAIL = $1",[email])

        res.json(user.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;
