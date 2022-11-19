const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/getname", authorize, async (req, res) => {
	try {
		const { type } = req.body;
		let user;
		if (type === "admin") {
			user = await pool.query(
				"SELECT * FROM admin WHERE admin_id = $1;",
				[req.user.id]
			);
			res.json(user.rows[0].admin_name);
		} else if (type === "retailer") {
			user = await pool.query("SELECT * FROM retailer WHERE r_id = $1;", [
				req.user.id,
			]);
			res.json(user.rows[0].r_name);
		} else {
			user = await pool.query("SELECT * FROM customer WHERE c_id = $1;", [
				req.user.id,
			]);
			res.json(user.rows[0].c_name);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
