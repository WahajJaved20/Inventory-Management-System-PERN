const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validinfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

// 1-> Destructure the req.body
// 2-> if user exists throw err
// 3-> Bcrypt the user password
// 4-> add user to the DB
// 5-> Generate JWT
router.post("/register", validInfo, async (req, res) => {
	const { username, email, name, password } = req.body;

	try {
		const user = await pool.query(
			"SELECT * FROM admin WHERE admin_email = $1",
			[email]
		);

		if (user.rows.length > 0) {
			return res.status(401).json("Admin already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO admin (admin_username, admin_email, admin_name, admin_password) VALUES ($1, $2, $3, $4) RETURNING *",
			[username, email, name, bcryptPassword]
		);

		const jwtToken = jwtGenerator(newUser.rows[0].admin_id);

		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/register/retailer", validInfo, async (req, res) => {
	const { username, companyName, password, mobile, address } = req.body;

	try {
		const user = await pool.query(
			"SELECT * FROM retailer WHERE r_username = $1",
			[companyName]
		);

		if (user.rows.length > 0) {
			return res.status(401).json("Company already exists!");
		}
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO retailer (r_username,  r_name, r_password,r_address,r_mobile_num) VALUES ($1, $2, $3, $4,$5) RETURNING *",
			[username, companyName, bcryptPassword, address, mobile]
		);

		const jwtToken = jwtGenerator(newUser.rows[0].r_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/login", validInfo, async (req, res) => {
	const { email, password } = req.body;
	let type;
	try {
		let user = await pool.query(
			"SELECT * FROM admin WHERE admin_email = $1",
			[email]
		);

		if (user.rows.length === 0) {
			user = await pool.query(
				"SELECT * FROM retailer WHERE r_companyName = $1",
				[email]
			);
			if (user.rows.length === 0) {
				user = await pool.query(
					"SELECT * FROM customer WHERE c_username = $1",
					[email]
				);
				if (user.rows.length === 0) {
					return res.status(401).json("Invalid Credential");
				} else {
					type = "customer";
				}
			} else {
				type = "retailer";
			}
		} else {
			type = "admin";
		}

		const validPassword = await bcrypt.compare(
			password,
			type === "admin"
				? user.rows[0].admin_password
				: type === "retailer"
				? user.rows[0].r_password
				: user.rows[0].c_password
		);

		if (!validPassword) {
			return res.status(401).json("Invalid Credential");
		}
		const jwtToken = jwtGenerator(
			type === "admin"
				? user.rows[0].admin_id
				: type === "retailer"
				? user.rows[0].r_id
				: user.rows[0].c_id
		);
		return res.json({ jwtToken, type });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/verify", authorize, (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
