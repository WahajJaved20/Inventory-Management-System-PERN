const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT * FROM admin WHERE admin_id = $1;",
      [req.user.id] 
    ); 
    res.json(user.rows[0].admin_name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
