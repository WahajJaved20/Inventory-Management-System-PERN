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
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";
import "./login.css";

function Login() {
	const [username, setUsername] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [password, setPassword] = React.useState("");
	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}
	useEffect(() => {}, [username, showPassword, password]);
	return (
		<div>
			<AuthNavbar />
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
						sx={{ marginLeft: 10, marginTop: 5 }}>
						<InputLabel
							style={{ fontSize: 20 }}
							sx={{
								color: "white",
								fontSize: 20,
								marginLeft: 8,
							}}>
							Username
						</InputLabel>
						<Box
							sx={{
								marginTop: 6,
								display: "flex",
								alignItems: "flex-end",
							}}>
							<PersonIcon
								sx={{
									color: "white",
									mr: 1,
									my: 0.5,
									fontSize: "50px",
								}}
							/>
							<OutlinedInput
								InputProps={{
									disableUnderline: true,
								}}
								InputLabelProps={{
									style: { color: "#fff", fontSize: 20 },
								}}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								sx={{
									backgroundColor: "#525461",
									borderRadius: 4,
									width: 400,
									fontSize: 25,
									height: 60,
									color: "#FFFFFF",
								}}
							/>
						</Box>
					</FormControl>
					<FormControl
						variant="standard"
						sx={{ marginLeft: 10, marginTop: 5 }}>
						<InputLabel
							style={{ fontSize: 20 }}
							size="normal"
							sx={{
								color: "#FFFFFF",
								fontSize: 20,
								marginLeft: 8,
							}}>
							Password
						</InputLabel>
						<Box
							sx={{
								marginTop: 6,
								display: "flex",
								alignItems: "flex-end",
							}}>
							<PasswordIcon
								sx={{
									color: "white",
									mr: 1,
									my: 0.5,
									fontSize: "50px",
								}}
							/>
							<OutlinedInput
								InputProps={{
									color: "#fff",
								}}
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								sx={{
									backgroundColor: "#525461",
									borderRadius: 4,
									width: 400,
									fontSize: 25,
									height: 60,
									color: "#FFFFFF",
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											sx={{
												color: "white",
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
							/>
						</Box>
					</FormControl>
					<Box
						sx={{
							marginTop: 5,
							display: "flex",
							alignItems: "flex-end",
						}}>
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
						<Button
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
