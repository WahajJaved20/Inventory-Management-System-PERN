import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomizedSnackbars from "../../../components/alerts/authAlerts";

function GetMaxCount({ Transition, handleClose, open, getNotifications }) {
	const [count, setCount] = useState(0);
	const [openErr, setOpenErr] = useState(false);
	useEffect(() => {}, []);
	async function handleApproval() {
		if (!parseInt(count) || parseInt(count) <= 0) {
			setOpenErr(true);
			return;
		}
		const token = localStorage.getItem("token");
		const r_id = localStorage.getItem("notif");
		try {
			const inputs = { r_id: r_id, count: count };

			const response = await fetch(
				"http://localhost:5000/notif/handleRetailerApproval",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			console.log(parseRes);
			getNotifications();
			handleClose();
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<div>
			<CustomizedSnackbars
				open={openErr}
				setOpen={setOpenErr}
				message={"Count should be greater than 0"}
				type="error"
			/>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description">
				<DialogTitle>{"INVENTORY DETAILS"}</DialogTitle>
				<DialogContent>
					<DialogContentText>Max Count: </DialogContentText>
					<TextField
						variant="standard"
						error={parseInt(count) <= 0}
						onChange={(e) => {
							setCount(e.target.value);
						}}
						value={count}
					/>
					<Divider />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
				<DialogActions>
					<Button onClick={handleApproval}>Approve</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default GetMaxCount;
