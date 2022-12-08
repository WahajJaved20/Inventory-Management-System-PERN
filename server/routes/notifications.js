const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { Router } = require("express");

router.post("/getAdminNotifications", authorize, async (req, res) => {
	try {
		let notifications = await pool.query(
			"SELECT * FROM retailer JOIN notifications ON (referrer_id = R_ID) WHERE TYPE=$1",
			[1]
		);
		res.json(notifications.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/handleRetailerRejection", authorize, async (req, res) => {
	try {
		const { r_id } = req.body;
		let Entitydeletion = await pool.query(
			"DELETE FROM RETAILER WHERE r_id=$1",
			[r_id]
		);
		let notificationDeletion = await pool.query(
			"DELETE FROM NOTIFICATIONS WHERE REFERRER_ID=$1 AND TYPE=$2",
			[r_id, 1]
		);
		res.json({ status: "success" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/handleRetailerApproval", authorize, async (req, res) => {
	try {
		const { r_id, count } = req.body;
		let enititySelection = await pool.query(
			"UPDATE RETAILER SET R_APPROVAL_STATUS=$2 WHERE r_id=$1",
			[r_id, "TRUE"]
		);
		let notificationDeletion = await pool.query(
			"DELETE FROM NOTIFICATIONS WHERE REFERRER_ID=$1 AND TYPE=$2",
			[r_id, 1]
		);
		let addinven = await pool.query(
			"INSERT INTO INVENTORY(r_id,inventory_max_count) VALUES ($1,$2) RETURNING *",
			[r_id, count]
		);
		res.json({ status: "success" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

router.post("/getRetailerNotifications", authorize, async (req, res) => {
	try {
		let notifications = await pool.query(
			"SELECT * FROM retailer JOIN notifications ON (referrer_id = R_ID) WHERE TYPE=$1 AND R_ID=$2",
			[2, req.user.id]
		);
		res.json(notifications.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
module.exports = router;
