const router = require("express").Router()
const { Email } = require("@mui/icons-material");
const { json } = require("express");
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
//register 

router.post("/register", validInfo ,async(req,res)=>{
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
//login
router.post("/login", validInfo,async(req,res)=>{
    try {
        //destructure
        const {email,password} = req.body;

        //check is user exists
        const users = await pool.query("SELECT * FROM ADMIN WHERE ADMIN_EMAIL = $1",[email])
        if(users.rows.length === 0){
            return res.status(401).json("Password or email is incorrect");
        }
        //check if incoming password
        const validPassword = await bcrypt.compare(
            password, users.rows[0].admin_password
        );
        if(!validPassword){
            return res.status.json("Password or Email is incorrect");
        }
        const token = jwtGenerator(users.rows[0].user_id);

        res.json({token});
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})
module.exports = router;

