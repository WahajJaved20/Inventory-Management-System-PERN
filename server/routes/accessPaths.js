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
		let inventory_id = await pool.query(
			"SELECT INVENTORY_ID FROM RETAILER WHERE R_ID=$1;",
			[r_id]
		);
		let deleteStock = await pool.query(
			"DELETE FROM STOCK WHERE INVENTORY_ID=$1",
			[inventory_id.rows[0].inventory_id]
		);
		let deleteInventory = await pool.query(
			"DELETE FROM INVENTORY WHERE INVENTORY_ID=$1",
			[inventory_id.rows[0].inventory_id]
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
