import React, { useEffect } from "react";
import AuthNavbar from "../components/auth/navbar";
import {
	Typography,
	FormControl,
	Box,
	Button,
	InputLabel,
	OutlinedInput,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import CustomizedSnackbars from "../components/alerts/authAlerts";
import "./login.css";

function Login({ setAuth }) {
	const [username, setUsername] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		const inputs = {
			email: username,
			password: password,
		};
		try {
			const response = await fetch(
				"http://localhost:5000/authentication/login",
				{
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			if (parseRes === "Invalid Credential") {
				setMessage("Could not Log in, Invalid Credentials");
				setOpen(true);
			} else if (parseRes === "Account Not Approved Yet!") {
				setMessage("Account Not Approved Yet!");
				setOpen(true);
			} else {
				localStorage.setItem("token", parseRes.jwtToken);
				localStorage.setItem("type", parseRes.type);
				setAuth(true);
			}
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {}, [username, showPassword, password]);
	return (
		<div>
			<AuthNavbar />
			<CustomizedSnackbars
				open={open}
				setOpen={setOpen}
				message={message}
			/>
			<div className="Form">
				<Stack direction={"column"}>
					<Stack direction={"row"}>
						<Typography
							variant="h5"
							style={{
								marginLeft: 90,
								marginTop: 60,
								color: "white",
								fontWeight: "bold",
								fontSize: "50px",
								textAlign: "center",
							}}>
							Log In To Your Account
						</Typography>
						<Typography
							variant="h3"
							style={{
								marginLeft: 3,
								marginTop: 37,
								color: "blue",
								fontSize: "80px",
								fontFamily: "Arial",
								textAlign: "center",
							}}>
							.
						</Typography>
					</Stack>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 10, marginTop: 10 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#FFFFFF",
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
									Username
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 10, marginTop: 10 }}>
						<Stack direction={"column"}>
							<OutlinedInput
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type={showPassword ? "text" : "password"}
								value={password}
								startAdornment={
									<InputAdornment position="start">
										<PasswordIcon />
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
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "white",
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
									Password
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<Box
						sx={{
							marginTop: 10,
							marginLeft: 10,
							display: "flex",
							alignItems: "flex-end",
						}}>
						<Link to="/register" style={{ textDecoration: "none" }}>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#525461",
									width: 130,
									marginLeft: 32,
									height: 50,
									borderRadius: 6,
									fontSize: 20,
									fontWeight: "bold",
								}}>
								Sign Up
							</Button>
						</Link>

						<Button
							onClick={handleSubmit}
							variant="contained"
							sx={{
								width: 130,
								marginLeft: 2,
								height: 50,
								borderRadius: 6,
								fontSize: 20,
								fontWeight: "bold",
							}}>
							Sign In
						</Button>
					</Box>
				</Stack>
			</div>
		</div>
	);
}
export default Login;
