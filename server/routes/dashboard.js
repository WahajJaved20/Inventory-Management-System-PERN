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
router.post("/addInventory", authorize, async (req, res) => {
	try {
		const { type, description } = req.body;
		let addinven = await pool.query(
			"INSERT INTO INVENTORY(INVENTORY_TYPE, INVENTORY_DESCRIPTION) VALUES ($1, $2) RETURNING *",
			[type, description]
		);
		let addretinvent = await pool.query(
			"UPDATE INVENTORY SET r_id = $1 WHERE INVENTORY_ID = $2 RETURNING *",
			[req.user.id, addinven.rows[0].inventory_id]
		);
		let notifDelete = await pool.query(
			"DELETE FROM NOTIFICATIONS WHERE referrer_id=$1",
			[req.user.id]
		);
		res.json("success");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/addProduct", authorize, async (req, res) => {
	try {
		const { name, count } = req.body;
		let addProd = await pool.query(
			"INSERT INTO PRODUCT(INVENTORY_ID, PRODUCT_NAME, PRODUCT_COUNT) VALUES ((SELECT INVENTORY_ID from INVENTORY WHERE R_ID = $1),$2, $3) RETURNING *",
			[req.user.id, name, count]
		);
		// update the count in inventory
		let updateinvent = await pool.query(
			"UPDATE INVENTORY SET INVENTORY_COUNT = INVENOTRY_COUNT+$1 WHERE INVENTORY_ID = $2",
			[count, addProd.rows[0].inventory_id]
		);
		res.json("Success");
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
		res.status(500).send("Server error");
	}
});
router.get("/getInventory", authorize, async (req, res) => {
	try {
		let getID = await pool.query(
			"SELECT * from INVENTORY WHERE R_ID = $1",
			[req.user.id]
		);

		res.json(getID.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
module.exports = router;
