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
					<DialogContentText>INCREASE PRODUCT</DialogContentText>
				</Button>
				<Divider />
				<Button>
					<DialogContentText>DECREASE PRODUCT</DialogContentText>
				</Button>
				<Divider />
				<Button>
					<DialogContentText>REMOVE PRODUCT</DialogContentText>
				</Button>
				<Divider />
				<Button>
					<DialogContentText>UPDATE PRODUCT</DialogContentText>
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
