import "./retailerRegister.css";
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
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HomeIcon from "@mui/icons-material/Home";
import CustomizedSnackbars from "../components/alerts/authAlerts";
function RetailerRegister({ setAuth }) {
	const [username, setUsername] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [companyName, setCompanyName] = React.useState("");
	const [mobile, setMobile] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [errors, setErrors] = React.useState(new Map());
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const type = "error";
	var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	var phoneRegex = /^\d{11}$/;
	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}
	async function handleSubmit(e) {
		console.log(errors);
		if (!username || errors["username"]) {
			setMessage("The username should be atleast 6 characters long.");
			setOpen(true);
			return;
		}
		if (!email || errors["email"] == true) {
			setMessage("Please Enter a valid email");
			setOpen(true);
			return;
		}
		if (!password || errors["password"]) {
			setMessage("The password should be atleast 8 characters long.");
			setOpen(true);
			return;
		}

		if (!companyName || errors["companyName"]) {
			setMessage("The company Name is required");
			setOpen(true);
			return;
		}
		if (!mobile || errors["phone"] || mobile.includes("-")) {
			setMessage("Please Enter the correct phone number");
			setOpen(true);
			return;
		}
		if (!address || errors["address"]) {
			setMessage("The address should be atleast 10 characters long.");
			setOpen(true);
			return;
		}
		e.preventDefault();
		const inputs = {
			username: username,
			password: password,
			email: email,
			companyName: companyName,
			mobile: mobile,
			address: address,
		};
		try {
			const response = await fetch(
				"http://localhost:5000/authentication/register/retailer",
				{
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			localStorage.setItem("token", parseRes.jwtToken);
			localStorage.setItem("type", "retailer");
			setAuth(true);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {}, [
		username,
		showPassword,
		password,
		email,
		companyName,
		mobile,
		address,
	]);
	return (
		<div className="bg-img">
			<CustomizedSnackbars
				open={open}
				setOpen={setOpen}
				message={message}
				type={type}
			/>
			<div className="container">
				<Typography sx={{ fontSize: 50, textAlign: "center" }}>
					Retailer Registration
				</Typography>

				<Stack direction={"column"} className="input-container">
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								required
								error={username.length < 6}
								onChange={(e) => {
									setUsername(e.target.value);
									if (e.target.value.length < 6) {
										setErrors(
											new Map(
												errors.set("username", true)
											)
										);
									} else {
										setErrors(
											new Map(
												errors.set("username", false)
											)
										);
									}
								}}
								startAdornment={
									<InputAdornment position="start">
										<AccountCircle
											sx={{ color: "white" }}
										/>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Username
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={!email.match(validRegex) ? true : false}
								onChange={(e) => {
									setEmail(e.target.value);
									if (e.target.value.match(validRegex)) {
										setErrors(
											new Map(errors.set("email", false))
										);
									} else {
										setErrors(
											new Map(errors.set("email", true))
										);
									}
								}}
								startAdornment={
									<InputAdornment position="start">
										<EmailIcon sx={{ color: "white" }} />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Email
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
									setPassword(e.target.value);
									if (e.target.value.length < 8) {
										setErrors(
											new Map(
												errors.set("password", true)
											)
										);
									} else {
										setErrors(
											new Map(
												errors.set("password", false)
											)
										);
									}
								}}
								error={password.length < 8}
								type={showPassword ? "text" : "password"}
								value={password}
								startAdornment={
									<InputAdornment position="start">
										<PasswordIcon sx={{ color: "white" }} />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											sx={{
												color: "black",
												mr: 1,
												my: 0.5,
												fontSize: "50px",
											}}
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end">
											{showPassword ? (
												<VisibilityOff
													sx={{ color: "white" }}
												/>
											) : (
												<Visibility
													sx={{ color: "white" }}
												/>
											)}
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Password
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={companyName.length === 0}
								onChange={(e) => {
									setCompanyName(e.target.value);
									if (e.target.value.length === 0) {
										setErrors(
											new Map(
												errors.set("companyName", true)
											)
										);
									} else {
										setErrors(
											new Map(
												errors.set("companyName", false)
											)
										);
									}
								}}
								startAdornment={
									<InputAdornment position="start">
										<BusinessIcon sx={{ color: "white" }} />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Company Name
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={!mobile.match(phoneRegex) ? true : false}
								onChange={(e) => {
									setMobile(e.target.value);
									if (e.target.value.match(phoneRegex)) {
										setErrors(
											new Map(errors.set("phone", false))
										);
									} else {
										setErrors(
											new Map(errors.set("phone", true))
										);
									}
								}}
								startAdornment={
									<InputAdornment position="start">
										<ContactPhoneIcon
											sx={{ color: "white" }}
										/>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Mobile Number
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 3, marginTop: 5 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								error={address.length < 10}
								onChange={(e) => {
									setAddress(e.target.value);
									if (e.target.value.length < 10) {
										setErrors(
											new Map(errors.set("address", true))
										);
									} else {
										setErrors(
											new Map(
												errors.set("address", false)
											)
										);
									}
								}}
								startAdornment={
									<InputAdornment position="start">
										<HomeIcon sx={{ color: "white" }} />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#252525",
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
									Address
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
					Register
				</Button>
				<Link to="/" style={{ textDecoration: "none" }}>
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
export default RetailerRegister;
