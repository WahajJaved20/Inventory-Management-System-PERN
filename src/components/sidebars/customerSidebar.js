import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

function CustomerSidebar() {
	return (
		<Box
			className="sidebar"
			sx={{
				textAlign: "center",
				width: 80,
				paddingLeft: 1,
				paddingRight: 1,
				marginTop: 3,
				paddingTop: 3,
				marginLeft: 3,
				minHeight: "90vh",
				backgroundColor: "#4163CF",
				borderRadius: 4,
			}}>
			<Typography
				sx={{
					fontSize: 30,
					fontWeight: "bold",
					color: "white",
				}}>
				{" "}
				IVMS{" "}
			</Typography>

			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 25,
					padding: 1,
				}}>
				<AddShoppingCartIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<LocalAtmIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
		</Box>
	);
}
export default CustomerSidebar;
