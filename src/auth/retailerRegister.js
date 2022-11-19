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
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HomeIcon from "@mui/icons-material/Home";
function RetailerRegister({ setAuth }) {
	const [username, setUsername] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [companyName, setCompanyName] = React.useState("");
	const [mobile, setMobile] = React.useState("");
	const [address, setAddress] = React.useState("");
	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}
	async function handleSubmit(e) {
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
			const history = useNavigate();
			history("/");
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
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<EmailIcon />
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
								onChange={(e) => {
									setCompanyName(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<BusinessIcon />
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
								onChange={(e) => {
									setMobile(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<ContactPhoneIcon />
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
								onChange={(e) => {
									setAddress(e.target.value);
								}}
								startAdornment={
									<InputAdornment position="start">
										<HomeIcon />
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
