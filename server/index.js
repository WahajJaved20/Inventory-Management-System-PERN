const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Register and login
app.use("/auth", require("./routes/auth"));


app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, ()=>{
    console.log("server has started on port 5000");
})

