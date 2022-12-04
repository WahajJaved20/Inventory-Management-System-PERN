import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function InventoryInformation({ Transition, handleClose, open }) {
	const [data, setData] = useState({});
	useEffect(() => {
		async function getDetails() {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(
					"http://localhost:5000/dashboard/getInventory",
					{
						method: "GET",
						headers: { jwt_token: token },
					}
				);
				const parseRes = await response.json();
				setData(parseRes);
			} catch (err) {
				console.error(err);
			}
		}
		getDetails();
	}, []);
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description">
			<DialogTitle>{"INVENTORY DETAILS"}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					ID: {data["inventory_id"]}
				</DialogContentText>
				<Divider />
				<DialogContentText>
					TYPE: {data["inventory_type"]}
				</DialogContentText>
				<Divider />
				<DialogContentText>
					Count: {data["inventory_count"]}
				</DialogContentText>
				<Divider />
				<DialogContentText>
					Max Count: {data["inventory_max_count"]}
				</DialogContentText>
				<Divider />
				<DialogContentText>
					Description: {data["inventory_description"]}
				</DialogContentText>
				<Divider />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
export default InventoryInformation;
