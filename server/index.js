const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// listen to some port to work with our server and notice changes
app.listen(5000, () => {
	console.log("server has started on port 5000");
});
