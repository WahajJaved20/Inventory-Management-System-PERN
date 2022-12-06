const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/getListOfRetailers", authorize, async (req, res) => {
	try {
		let retailers = await pool.query("SELECT * FROM RETAILER_ACCESSES;");
		res.json(retailers.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getListOfCustomers", authorize, async (req, res) => {
	try {
		let customers = await pool.query("SELECT* FROM CUSTOMER_ACCESSES;");
		res.json(customers.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/handleCustomerDeletion", authorize, async (req, res) => {
	try {
		const { c_id } = req.body;
		console.log(c_id);
		let customers = await pool.query("DELETE FROM CUSTOMER WHERE C_ID=$1", [
			c_id,
		]);
		res.json({ message: "success" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/handleRetailerDeletion", authorize, async (req, res) => {
	try {
		const { r_id } = req.body;
		console.log(r_id);
		let inventID = await pool.query(
			"SELECT * FROM INVENTORY WHERE r_ID=$1",
			[r_id]
		);
		let deleteProducts = await pool.query(
			"DELETE FROM PRODUCT WHERE inventory_id=$1",
			[inventID.rows[0].inventory_id]
		);
		let deleteInventory = await pool.query(
			"DELETE FROM INVENTORY WHERE r_ID=$1",
			[r_id]
		);
		let deleteRetailer = await pool.query(
			"DELETE FROM RETAILER WHERE R_ID=$1",
			[r_id]
		);
		res.json({ message: "success" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
module.exports = router;
