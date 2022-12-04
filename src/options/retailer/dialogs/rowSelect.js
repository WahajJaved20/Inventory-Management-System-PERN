import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
} from "@mui/material";
import React from "react";

function RowSelection({ Transition, handleClose, open, data }) {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description">
			<DialogTitle>{"Options"}</DialogTitle>
			<DialogContent>
				<Button>
					<DialogContentText>INBOUND</DialogContentText>
				</Button>
				<Divider />
				<Button>
					<DialogContentText>OUTBOUND</DialogContentText>
				</Button>
				<Divider />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}
export default RowSelection;
