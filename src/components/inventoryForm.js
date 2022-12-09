import "../options/background.css";
import {
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	Stack,
	InputAdornment,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import CustomizedSnackbars from "./alerts/authAlerts";
function InventoryForm({ setAuth }) {
	const [type, setType] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [errOpen, setErrOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [description, setDescription] = React.useState("");
	async function handleSubmit(e) {
		if (!type) {
			setMessage("Type Length Should be greater than 0");
			setErrOpen(true);
			return;
		}
		if (!description) {
			setMessage("Description Length Should be greater than 0");
			setErrOpen(true);
			return;
		}
		e.preventDefault();
		const token = localStorage.getItem("token");
		const inputs = {
			type: type,
			description: description,
		};
		try {
			const response = await fetch(
				"http://localhost:5000/dashboard/addInventory",
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
			setOpen(true);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {}, []);
	return (
		<div className="co">
			<div className="container">
				<Typography sx={{ fontSize: 50, textAlign: "center" }}>
					Inventory Details
				</Typography>
				<Link to="/dashboard/retailer">
					<CustomizedSnackbars
						open={open}
						setOpen={setOpen}
						message={"Click to go back"}
						type={"success"}
					/>
				</Link>
				<CustomizedSnackbars
					open={errOpen}
					setOpen={setErrOpen}
					message={message}
					type={"error"}
				/>
				<Stack direction={"column"} className="input-container">
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={type.length === 0}
								onChange={(e) => {
									setType(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<CategoryIcon sx={{ color: "white" }} />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#171718",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
									color: "white",
								}}
							/>
							<InputLabel
								style={{ fontSize: 20, marginTop: -30 }}
								sx={{
									color: "white",
									marginLeft: 2,
								}}>
								<Typography
									sx={{ fontSize: 25, fontWeight: "bold" }}>
									Type
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={description.length === 0}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<DescriptionIcon
											sx={{ color: "white" }}
										/>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#171718",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
									color: "white",
								}}
							/>
							<InputLabel
								style={{ fontSize: 20, marginTop: -30 }}
								sx={{
									color: "white",
									marginLeft: 2,
								}}>
								<Typography
									sx={{ fontSize: 25, fontWeight: "bold" }}>
									Description
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
				</Stack>
				<Button
					variant="contained"
					color="success"
					onClick={handleSubmit}
					sx={{
						marginTop: 5,
						width: 150,
						height: 50,
						fontWeight: "bold",
					}}>
					Update
				</Button>
				<Link
					to="/dashboard/retailer"
					style={{ textDecoration: "none" }}>
					<Button
						variant="contained"
						color="error"
						sx={{
							marginLeft: 5,
							marginTop: 5,
							width: 150,
							height: 50,
							fontWeight: "bold",
						}}>
						Cancel
					</Button>
				</Link>
			</div>
		</div>
	);
}
export default InventoryForm;
