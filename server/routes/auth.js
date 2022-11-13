const router = require("express").Router()
const { Email } = require("@mui/icons-material");
const { json } = require("express");
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
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
        const cryptPassword = await bcrypt.hash(password, salt);

        //enter new user in db
        const newUser = await pool.query
        ("INSERT INTO ADMIN(ADMIN_USERNAME, ADMIN_NAME, ADMIN_EMAIL,ADMIN_PASSWORD) VALUES ($1,$2,$3,$4) RETURNING *",[username,name, email, cryptPassword]);
        const token = jwtGenerator(newUser.rows[0].userid);
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;
