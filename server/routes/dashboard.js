const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const { popoverClasses } = require("@mui/material");

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
router.get("/getSender", authorize, async (req, res) => {
	try {
		let getSender = await pool.query("SELECT * from Sender");
		res.json(getSender.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.get("/getReciever", authorize, async (req, res) => {
	try {
		let getReciever = await pool.query("SELECT * from Reciever");
		res.json(getReciever.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/handleProductApproval", authorize, async (req, res) => {
	try {
		const { name } = req.body;
		let getInventory = await pool.query(
			"SELECT INVENTORY_ID FROM INVENTORY where R_ID = $1 ",
			[req.user.id]
		);

		let checkInventory = await pool.query(
			"SELECT * FROM PRODUCT WHERE INVENTORY_ID = $1 and PRODUCT_NAME = $2",
			[getInventory.rows[0].inventory_id, name]
		);
		if (checkInventory.rows[0]) {
		} else {
			let addID = await pool.query(
				"UPDATE PRODUCT SET INVENTORY_ID = $1 WHERE PRODUCT_NAME=$2",
				[getInventory.rows[0].inventory_id, name]
			);
		}
		let addInventory = await pool.query(
			"UPDATE INVENTORY SET INVENTORY_COUNT = INVENTORY_COUNT+$1",
			[checkInventory.rows[0].PRODUCT_COUNT]
		);
		res.json("success");
	} catch (err) {}
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
		let addretinvent = await pool.query(
			"UPDATE INVENTORY SET inventory_type=$1,inventory_description=$2 WHERE r_id = $3 RETURNING *",
			[type, description, req.user.id]
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
router.post("/getQueriedInventory", authorize, async (req, res) => {
	try {
		const { inventory_ID } = req.body;
		let getID = await pool.query(
			"SELECT * from INVENTORY WHERE INVENTORY_ID = $1",
			[inventory_ID]
		);
		res.json(getID.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getQueriedRetailer", authorize, async (req, res) => {
	try {
		const { inventory_ID } = req.body;
		let retailer_id = await pool.query(
			"SELECT * FROM INVENTORY WHERE INVENTORY_ID=$1",
			[inventory_ID]
		);
		let getID = await pool.query(
			"SELECT * from RETAILER JOIN INVENTORY ON RETAILER.R_ID=INVENTORY.R_ID WHERE INVENTORY_ID = $1",
			[inventory_ID]
		);
		res.json(getID.rows[0]);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/addInboundExisting", authorize, async (req, res) => {
	try {
		const { count, name } = req.body;
		let inventID = await pool.query(
			"SELECT * FROM INVENTORY WHERE R_ID=$1 ",
			[req.user.id]
		);
		if (
			inventID.rows[0].inventory_max_count <
			parseInt(inventID.rows[0].inventory_count) + parseInt(count)
		) {
			res.json("exceeded");
		} else {
			let product_count = await pool.query(
				"SELECT * FROM PRODUCT WHERE PRODUCT_NAME=$1 AND INVENTORY_ID=$2",
				[name, inventID.rows[0].inventory_id]
			);
			let updateProduct = await pool.query(
				"UPDATE PRODUCT SET PRODUCT_COUNT=$1 WHERE PRODUCT_NAME=$2",
				[
					parseInt(product_count.rows[0].product_count) +
						parseInt(count),
					name,
				]
			);
			let inventoryUpdate = await pool.query(
				"UPDATE INVENTORY SET INVENTORY_COUNT=$1 WHERE INVENTORY_ID=$2",
				[
					parseInt(inventID.rows[0].inventory_count) +
						parseInt(count),
					inventID.rows[0].inventory_id,
				]
			);
			res.json("success");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/addInboundNew", authorize, async (req, res) => {
	try {
		const { sendername, count, name, type, description } = req.body;
		let getInventory = await pool.query(
			"SELECT INVENTORY_ID FROM INVENTORY WHERE R_ID = $1",
			[req.user.id]
		);
		let addInbound = await pool.query(
			"INSERT INTO INBOUND (PRODUCT_COUNT, PRODUCT_NAME, SENDER_ID, INVENTORY_ID) VALUES ($2,$1,$3,$4)",
			[name, count, sendername, getInventory.rows[0].inventory_id]
		);

		let addProduct = await pool.query(
			"INSERT INTO PRODUCT (PRODUCT_NAME,PRODUCT_COUNT, PRODUCT_DESCRIPTION, PRODUCT_TYPE) VALUES ($1,$2,$3,$4)",
			[name, count, description, type]
		);

		res.json("success");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getInbound", authorize, async (req, res) => {
	try {
		let { name } = req.body;
		let getInbound;
		if (!name) {
			getInbound = await pool.query(
				"SELECT * FROM INBOUND JOIN INVENTORY ON INBOUND.INVENTORY_ID = INVENTORY.INVENTORY_ID JOIN PRODUCT ON INBOUND.PRODUCT_NAME=PRODUCT.PRODUCT_NAME JOIN SENDER ON SENDER.S_ID=INBOUND.SENDER_ID where R_ID = $1 AND APPROVAL_STATUS=$2",
				[req.user.id, "False"]
			);
		} else {
			getInbound = await pool.query(
				"SELECT * FROM INBOUND JOIN INVENTORY ON INBOUND.INVENTORY_ID = INVENTORY.INVENTORY_ID JOIN SENDER ON SENDER.S_ID=INBOUND.SENDER_ID where R_ID = $1 and INBOUND.product_name LIKE $2 AND APPROVAL_STATUS=$3",
				[req.user.id, "%" + name + "%", "False"]
			);
		}
		res.json(getInbound.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/rejectInbound", authorize, async (req, res) => {
	try {
		let { id } = req.body;
		let inbound = await pool.query(
			"SELECT * FROM INBOUND WHERE INBOUND_ID=$1",
			[id]
		);
		let result = await pool.query(
			"DELETE FROM INBOUND WHERE INBOUND_ID=$1",
			[id]
		);
		let res2 = await pool.query(
			"DELETE FROM PRODUCT WHERE PRODUCT_NAME=$1 AND PRODUCT_COUNT=$2",
			[inbound.rows[0].product_name, inbound.rows[0].product_count]
		);
		res.json("success");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/addOutbound", authorize, async (req, res) => {
	try {
		const { count, id, recv_name } = req.body;
		let getInventory = await pool.query(
			"SELECT * FROM INVENTORY WHERE R_ID = $1",
			[req.user.id]
		);
		let updateProduct = await pool.query(
			"SELECT * FROM PRODUCT WHERE PRODUCT_ID=$1",
			[id]
		);
		if (updateProduct.rows[0].product_count < count) {
			res.json("exceeded");
		} else {
			let getreciever = await pool.query(
				"SELECT R_ID FROM RECIEVER WHERE R_NAME = $1",
				[recv_name]
			);
			let getOutbound = await pool.query(
				"INSERT INTO OUTBOUND (INVENTORY_ID, PRODUCT_ID, PRODUCT_COUNT,RECIEVER_ID) VALUES ($1,$2,$3,$4) RETURNING *",
				[
					getInventory.rows[0].inventory_id,
					id,
					count,
					getreciever.rows[0].r_id,
				]
			);

			let updation = await pool.query(
				"UPDATE PRODUCT SET PRODUCT_COUNT=$1 WHERE PRODUCT_ID=$2",
				[
					updateProduct.rows[0].product_count - count,
					updateProduct.rows[0].product_id,
				]
			);
			let inventoryUpdate = await pool.query(
				"UPDATE INVENTORY SET INVENTORY_COUNT=$1 WHERE INVENTORY_ID=$2",
				[
					parseInt(getInventory.rows[0].inventory_count) - count,
					getInventory.rows[0].inventory_id,
				]
			);
			res.json(getOutbound.rows[0]);
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getOutbound", authorize, async (req, res) => {
	try {
		let { name } = req.body;
		let getOutbound;
		if (!name) {
			getOutbound = await pool.query(
				"SELECT * FROM OUTBOUND JOIN INVENTORY ON OUTBOUND.INVENTORY_ID = INVENTORY.INVENTORY_ID JOIN PRODUCT ON OUTBOUND.PRODUCT_ID=PRODUCT.PRODUCT_ID JOIN RECIEVER ON RECIEVER.R_ID=OUTBOUND.RECIEVER_ID where INVENTORY.R_ID = $1",
				[req.user.id]
			);
		} else {
			getOutbound = await pool.query(
				"SELECT * FROM OUTBOUND JOIN INVENTORY ON OUTBOUND.INVENTORY_ID = INVENTORY.INVENTORY_ID JOIN PRODUCT ON OUTBOUND.PRODUCT_ID=PRODUCT.PRODUCT_ID JOIN RECIEVER ON RECIEVER.R_ID=OUTBOUND.RECIEVER_ID where INVENTORY.R_ID = $1 AND PRODUCT.PRODUCT_NAME LIKE $2",
				[req.user.id, "%" + name + "%"]
			);
		}
		res.json(getOutbound.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/decreaseProduct", authorize, async (req, res) => {
	try {
		const { id, count } = req.body;
		let getinventory = await pool.query(
			"SELECT * from INVENTORY WHERE R_ID = $1",
			[req.user.id]
		);
		let product = await pool.query(
			"SELECT * FROM PRODUCT JOIN INVENTORY ON PRODUCT.INVENTORY_ID = INVENTORY.INVENTORY_ID WHERE INVENTORY.R_ID = $1 AND PRODUCT_ID = $2 ",
			[req.user.id, id]
		);
		if (parseInt(product.rows[0].product_count) < parseInt(count)) {
			res.json("decrement error");
		} else {
			let insertion = await pool.query(
				"UPDATE PRODUCT SET PRODUCT_COUNT=$1 WHERE INVENTORY_ID=$2 AND PRODUCT_ID=$3",
				[
					parseInt(product.rows[0].product_count) - parseInt(count),
					getinventory.rows[0].inventory_id,
					id,
				]
			);
			let updateInventory = await pool.query(
				"UPDATE INVENTORY SET INVENTORY_COUNT=$1 WHERE INVENTORY_ID=$2",
				[
					parseInt(getinventory.rows[0].inventory_count) -
						parseInt(count),
					getinventory.rows[0].inventory_id,
				]
			);
			res.json("success");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/addProduct", authorize, async (req, res) => {
	try {
		const { name, count, type, description } = req.body;
		let getinventory = await pool.query(
			"SELECT * from INVENTORY WHERE R_ID = $1",
			[req.user.id]
		);

		let product = await pool.query(
			"SELECT * FROM PRODUCT JOIN INVENTORY ON PRODUCT.INVENTORY_ID = INVENTORY.INVENTORY_ID WHERE INVENTORY.R_ID = $1 AND PRODUCT_NAME LIKE $2 ",
			[req.user.id, name]
		);

		if (
			parseInt(getinventory.rows[0].inventory_count) + parseInt(count) >
			getinventory.rows[0].inventory_max_count
		) {
			res.json("count exceeded");
		} else {
			if (product.rows[0]) {
				let insertion = await pool.query(
					"UPDATE PRODUCT SET PRODUCT_COUNT=$1 WHERE INVENTORY_ID=$2 AND PRODUCT_NAME=$3",
					[
						parseInt(product.rows[0].product_count) +
							parseInt(count),
						getinventory.rows[0].inventory_id,
						name,
					]
				);
				let updateInventory = await pool.query(
					"UPDATE INVENTORY SET INVENTORY_COUNT=$1 WHERE INVENTORY_ID=$2",
					[
						parseInt(getinventory.rows[0].inventory_count) +
							parseInt(count),
						getinventory.rows[0].inventory_id,
					]
				);
			} else {
				let addProd = await pool.query(
					"INSERT INTO PRODUCT(INVENTORY_ID, PRODUCT_NAME, PRODUCT_COUNT,PRODUCT_TYPE,PRODUCT_DESCRIPTION) VALUES ($1,$2, $3,$4,$5) RETURNING *",
					[
						getinventory.rows[0].inventory_id,
						name,
						count,
						type,
						description,
					]
				);
				// update the count in inventory
				let updateinvent = await pool.query(
					"UPDATE INVENTORY SET INVENTORY_COUNT = INVENTORY_COUNT+$1 WHERE INVENTORY_ID = $2",
					[count, addProd.rows[0].inventory_id]
				);
			}
			res.json("Success");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/editProduct", authorize, async (req, res) => {
	try {
		const { id, name, count, description, type } = req.body;
		console.log(id);
		let getinventory = await pool.query(
			"SELECT * FROM INVENTORY where R_ID = $1 ",
			[req.user.id]
		);
		let product = await pool.query(
			"SELECT * FROM PRODUCT WHERE PRODUCT_ID=$1",
			[id]
		);
		console.log(product.rows[0]);
		let editProduct = await pool.query(
			"UPDATE PRODUCT SET PRODUCT_NAME = $1, PRODUCT_COUNT = $2, PRODUCT_DESCRIPTION = $3, PRODUCT_TYPE = $4 where PRODUCT_ID=$5",
			[name, count, description, type, id]
		);
		console.log(getinventory.rows[0]);
		let newCount =
			parseInt(count) - parseInt(product.rows[0].product_count);
		let updateInventory = await pool.query(
			"UPDATE INVENTORY SET INVENTORY_COUNT=$1 WHERE INVENTORY_ID=$2",
			[
				parseInt(getinventory.rows[0].inventory_count) +
					parseInt(newCount),
				getinventory.rows[0].inventory_id,
			]
		);
		res.json("success");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/removeProduct", authorize, async (req, res) => {
	try {
		const { id } = req.body;

		let prod = await pool.query(
			"SELECT * FROM PRODUCT WHERE PRODUCT_ID = $1",
			[id]
		);
		console.log(prod.rows);
		if (prod.rows.length == 0) {
			res.json("non-existent");
			return;
		} else {
			let getinventory = await pool.query(
				"SELECT * FROM INVENTORY where R_ID = $1 ",
				[req.user.id]
			);
			let subtractcount = pool.query(
				"UPDATE INVENTORY SET INVENTORY_COUNT = INVENTORY_COUNT-$1 WHERE INVENTORY_ID = (SELECT INVENTORY_ID from INVENTORY WHERE R_ID = $2)",
				[prod.rows[0].product_count, req.user.id]
			);
			let removeProduct = pool.query(
				"DELETE FROM PRODUCT WHERE PRODUCT_ID = $1",
				[id]
			);
			res.json("success");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
//search by name of product join product by inventory
router.post("/getProducts", authorize, async (req, res) => {
	try {
		const { name } = req.body;
		let searchProduct = await pool.query(
			"SELECT * FROM PRODUCT JOIN INVENTORY ON PRODUCT.INVENTORY_ID = INVENTORY.INVENTORY_ID WHERE INVENTORY.R_ID = $1 AND PRODUCT_NAME LIKE $2 ",
			[req.user.id, "%" + name + "%"]
		);
		res.json(searchProduct.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getProductItem", authorize, async (req, res) => {
	try {
		const { id } = req.body;
		let searchProduct = await pool.query(
			"SELECT * FROM PRODUCT WHERE PRODUCT_ID= $1 ",
			[id]
		);
		res.json(searchProduct.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/sendInboundHistory", authorize, async (req, res) => {
	try {
		const { id } = req.body;
		const inventoryID = await pool.query(
			"SELECT * FROM INBOUND WHERE INBOUND_ID=$1",
			[id]
		);
		const invent = await pool.query(
			"SELECT * FROM INVENTORY WHERE INVENTORY_ID=$1",
			[inventoryID.rows[0].inventory_id]
		);
		if (
			invent.rows[0].inventory_max_count <
			parseInt(invent.rows[0].inventory_count) +
				parseInt(inventoryID.rows[0].product_count)
		) {
			res.json("exceeded");
		} else {
			const assignProduct = await pool.query(
				"UPDATE PRODUCT SET INVENTORY_ID=$1 WHERE PRODUCT_NAME=$2 AND PRODUCT_COUNT=$3",
				[
					inventoryID.rows[0].inventory_id,
					inventoryID.rows[0].product_name,
					inventoryID.rows[0].product_count,
				]
			);
			let updateinvent = await pool.query(
				"UPDATE INVENTORY SET INVENTORY_COUNT = INVENTORY_COUNT+$1 WHERE INVENTORY_ID = $2",
				[
					inventoryID.rows[0].product_count,
					inventoryID.rows[0].inventory_id,
				]
			);
			const change = await pool.query(
				"UPDATE INBOUND SET APPROVAL_STATUS = $2 WHERE INBOUND_ID = $1",
				[id, "True"]
			);
			let createHistory = await pool.query(
				"INSERT INTO HISTORY (ID, ENTRY_TIME) VALUES ($1, CURRENT_TIMESTAMP)",
				[id]
			);
			res.json("success");
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/sendOutboundHistory", authorize, async (req, res) => {
	try {
		const { id } = req.body;
		let createHistory = await pool.query(
			"INSERT INTO HISTORY (ID, ENTRY_TIME) VALUES ($1, CURRENT_TIMESTAMP)",
			[id]
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getHistory", authorize, async (req, res) => {
	try {
		const { name } = req.body;
		const inventID = await pool.query(
			"SELECT * FROM INVENTORY WHERE r_id=$1",
			[req.user.id]
		);
		let history;
		if (!name) {
			history = await pool.query(
				"SELECT * FROM HISTORY JOIN INBOUND ON HISTORY.ID=INBOUND.INBOUND_ID AND INBOUND.INVENTORY_ID=$1",
				[inventID.rows[0].inventory_id]
			);
		} else {
			history = await pool.query(
				"SELECT * FROM HISTORY JOIN INBOUND ON HISTORY.ID=INBOUND.INBOUND_ID AND INBOUND.INVENTORY_ID=$1 WHERE PRODUCT_NAME LIKE $2",
				[inventID.rows[0].inventory_id, "%" + name + "%"]
			);
		}

		res.json(history.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
router.post("/getAdminHistory", authorize, async (req, res) => {
	try {
		const { name } = req.body;
		let history;
		if (!name) {
			history = await pool.query(
				"SELECT * FROM HISTORY JOIN INBOUND ON HISTORY.ID=INBOUND.INBOUND_ID"
			);
		} else {
			history = await pool.query(
				"SELECT * FROM HISTORY JOIN INBOUND ON HISTORY.ID=INBOUND.INBOUND_ID WHERE PRODUCT_NAME LIKE $1",
				["%" + name + "%"]
			);
		}

		res.json(history.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});
module.exports = router;
