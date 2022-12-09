const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/getListOfRetailers", authorize, async (req, res) => {
	try {
		const { name } = req.body;
		let retailers = await pool.query(
			"SELECT * FROM RETAILER JOIN INVENTORY ON RETAILER.R_ID = INVENTORY.R_ID WHERE R_NAME LIKE $1;",
			["%" + name + "%"]
		);
		console.log(retailers);
		res.json(retailers.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/handleRetailerDeletion", authorize, async (req, res) => {
	try {
		const { r_id } = req.body;
		let inventID = await pool.query(
			"SELECT * FROM INVENTORY WHERE r_ID=$1",
			[r_id]
		);
		let deleteProducts = await pool.query(
			"DELETE FROM PRODUCT WHERE inventory_id=$1",
			[inventID.rows[0].inventory_id]
		);
		let deleteHistoryInbound = await pool.query(
			"DELETE FROM HISTORY WHERE inventory_id=$1 AND INBOUND.INBOUND_ID=HISTORY.ID",
			[inventID.rows[0].inventory_id]
		);
		let deleteInbound = await pool.query(
			"DELETE FROM INBOUND WHERE inventory_id=$1",
			[inventID.rows[0].inventory_id]
		);
		let deleteHistoryOutbound = await pool.query(
			"DELETE FROM HISTORYS WHERE inventory_id=$1 AND OUTBOUND.OUTBOUND_ID=HISTORY.ID",
			[inventID.rows[0].inventory_id]
		);
		let deleteOutbound = await pool.query(
			"DELETE FROM OUTBOUND WHERE inventory_id=$1",
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
