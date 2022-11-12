const router = require("express").Router()
const { Email } = require("@mui/icons-material");
const { json } = require("express");
const pool = require("../db")
const bcrypt = require("bcrypt")
//register 

router.post("/register", async(req,res)=>{
    try {
        //destructuring req.body
        const {username,name,email,password} = req.body;

        const user = await pool.query("SELECT * FROM ADMIN WHERE ADMIN_EMAIL = $1", [email]);
        console.log(email, username);
        //check is user exists
        if(user.rows.length !== 0){
            return res.status(401).send("User already exits");
        }

        //bcrypt passwords
        const saltRound =10;
        const salt = await bcrypt.genSalt(saltRound);
        const cryptPassword = bcrypt.hash(password, salt);

        //enter new user in db
        const newUser = await pool.query
        ("INSERT INTO ADMIN(ADMIN_USERNAME, ADMIN_NAME, ADMIN_EMAIL,ADMIN_PASSWOR) VALUES ($1,$2,$3) RETURNING *",[username, NAME, email, crypt_password]);
         
        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;
