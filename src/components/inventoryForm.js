import "../options/background.css";
import {
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	Stack,
	InputAdornment,
	IconButton,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
function InventoryForm({ setAuth }) {
	const [type, setType] = React.useState("");
	const [description, setDescription] = React.useState("");
	async function handleSubmit(e) {
		// e.preventDefault();
		// const inputs = {
		// 	username: username,
		// 	password: password,
		// 	email: email,
		// 	companyName: companyName,
		// 	mobile: mobile,
		// 	address: address,
		// };
		// try {
		// 	const response = await fetch(
		// 		"http://localhost:5000/authentication/register/retailer",
		// 		{
		// 			method: "POST",
		// 			headers: { "Content-type": "application/json" },
		// 			body: JSON.stringify(inputs),
		// 		}
		// 	);
		// 	const parseRes = await response.json();
		// 	localStorage.setItem("token", parseRes.jwtToken);
		// 	localStorage.setItem("type", "retailer");
		// 	setAuth(true);
		// } catch (err) {
		// 	console.error(err);
		// }
	}
	useEffect(() => {}, []);
	return (
		<div className="co">
			<div className="container">
				<Typography sx={{ fontSize: 50, textAlign: "center" }}>
					Inventory Details
				</Typography>

				<Stack direction={"column"} className="input-container">
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								onChange={(e) => {
									setType(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<CategoryIcon />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#f1f1f1",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
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
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<DescriptionIcon />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#f1f1f1",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
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
