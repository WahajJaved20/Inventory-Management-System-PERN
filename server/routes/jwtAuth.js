const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

// 1-> Destructure the req.body
// 2-> if user exists throw err
// 3-> Bcrypt the user password
// 4-> add user to the DB
// 5-> Generate JWT
router.post("/register/admin", async (req, res) => {
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
		console.log(bcryptPassword)
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

router.post("/register/retailer", async (req, res) => {
	const {
		username,
		email,
		companyName,
		password,
		mobile,
		address,
	} = req.body;

	try {
		const user = await pool.query(
			"SELECT * FROM retailer WHERE r_email = $1",
			[email]
		);

		if (user.rows.length > 0) {
			return res.status(401).json("Company already exists!");
		}
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		let newUser = await pool.query(
			"INSERT INTO retailer (r_name,r_username, r_password,r_address,r_mobile_num,r_email) VALUES ($1, $2, $3, $4,$5,$6) RETURNING r_id",
			[companyName, username, bcryptPassword, address, mobile, email]
		);
		let notif = await pool.query(
			"INSERT INTO NOTIFICATIONS(referrer_id,string,type) VALUES ($1,$2,$3)",
			[newUser.rows[0].r_id, "Approve Retailer", 1]
		);
		let notifR = await pool.query(
			"INSERT INTO NOTIFICATIONS(referrer_id,string,type) VALUES ($1,$2,$3)",
			[newUser.rows[0].r_id, "Inventory Details", 2]
		);
		const jwtToken = jwtGenerator(newUser.rows[0].r_id);
		return res.json({ jwtToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	let type;
	try {
		let user = await pool.query(
			"SELECT * FROM admin WHERE admin_email = $1",
			[email]
		);
		if (user.rows.length === 0) {
			user = await pool.query(
				"SELECT * FROM retailer WHERE r_email= $1",
				[email]
			);
			if (user.rows.length === 0) {
				return res.status(401).json("Invalid Credential");
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
				: user.rows[0].r_password
		);
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);
		console.log(password)
		console.log(bcryptPassword)
		console.log(user.rows[0])
		if (!validPassword) {
			return res.status(401).json("Invalid Credential");
		}
		if (type === "retailer") {
			const status = user.rows[0].r_approval_status;
			console.log(status);
			if (status === "FALSE") {
				return res.status(401).json("Account Not Approved Yet!");
			}
		}
		const jwtToken = jwtGenerator(
			type === "admin" ? user.rows[0].admin_id : user.rows[0].r_id
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
