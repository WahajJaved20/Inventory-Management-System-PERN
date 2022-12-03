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
			res.json(user.rows[0].c_username);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getRetailerStatus", authorize, async (req, res) => {
	try {
		let user;
		user = await pool.query("SELECT * FROM retailer WHERE r_id = $1;", [
			req.user.id,
		]);
		res.json(user.rows[0].r_approval_status);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("addInventory", authorize,async (res, req)=>{
	try {
		const {type, description} = req.body;
		let addinven = await pool.query(
			"INSERT INTO INVENTORY(INVENTORY_TYPE, INVENTORY_DESCRIPTION) VALUES ($1, $2) RETURNING *",[
				type, description
		]);
		let addretinvent = await pool.query(
			"UPDATE RETAILER SET INVENTORY_ID = $1 WHERE retailer_id = $2", [addinven.INVENTORY_ID, req.user.id]
		)
		res.json('success');
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/getProfile", authorize, async (req, res) => {
	try {
		const { type } = req.body;
		let user;
		if (type === "admin") {
			user = await pool.query(
				"SELECT * FROM admin WHERE admin_id = $1;",
				[req.user.id]
			);
			res.json({
				name: user.rows[0].admin_name,
				companyName: "IVMS",
				address: "Karachi, Pakistan",
			});
		} else if (type === "retailer") {
			user = await pool.query("SELECT * FROM retailer WHERE r_id = $1;", [
				req.user.id,
			]);
			res.json({
				name: user.rows[0].r_username,
				companyName: user.rows[0].r_name,
				address: user.rows[0].r_address,
			});
		} else {
			user = await pool.query("SELECT * FROM customer WHERE c_id = $1;", [
				req.user.id,
			]);
			res.json({
				name: user.rows[0].c_username,
				companyName: "",
				address: user.rows[0].c_address,
			});
		}
	} catch (err) {
		console.err(err.message);
		res.status(500).send("Server error");
	}
});
module.exports = router;
