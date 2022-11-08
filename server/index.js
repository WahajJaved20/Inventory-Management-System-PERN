const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Login

//Register



app.listen(5000, ()=>{
    console.log("server has started on port 5000");
})

