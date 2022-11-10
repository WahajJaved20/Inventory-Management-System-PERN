import React from "react";
import "./registerScreen.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
function RegisterPage() {
	return (
		<div className="register">
			<div class="choice-box">
				<Typography
					sx={{
						fontSize: 40,
						color: "white",
						fontFamily: "Impact",
						marginBottom: 5,
					}}>
					REGISTER AS:
				</Typography>
				<Link
					to="/register/customer"
					style={{ textDecoration: "none" }}>
					<Button
						variant="contained"
						sx={{
							"&:hover": {
								backgroundColor: "#fff",
								color: "#3c52b2",
							},
							width: "70%",
							backgroundColor: "#58A058",
							color: "white",
							fontWeight: "bold",
							fontSize: 20,
						}}>
						CUSTOMER
					</Button>
				</Link>
				<Link to="/register/company" style={{ textDecoration: "none" }}>
					<Button
						sx={{
							"&:hover": {
								backgroundColor: "#fff",
								color: "#3c52b2",
							},
							marginTop: 5,
							width: "70%",
							backgroundColor: "#9A8ECE",
							color: "white",
							fontWeight: "bold",
							fontSize: 20,
						}}>
						COMPANY
					</Button>
				</Link>
			</div>
		</div>
	);
}
export default RegisterPage;
