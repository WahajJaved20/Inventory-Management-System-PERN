const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    res.json(req.user.id);
    // const user = await pool.query(
    //   "SELECT admin_name FROM admin WHERE admin_id = $1",
    //   [req.user.id] 
    // ); 
    
    
    // res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
