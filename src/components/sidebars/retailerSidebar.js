import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorageIcon from "@mui/icons-material/Storage";
import { Link } from "react-router-dom";
function RetailerSidebar() {
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
			<Link to="/dashboard/retailer" style={{ textDecoration: "none" }}>
				<Typography
					sx={{
						fontSize: 30,
						fontWeight: "bold",
						color: "white",
					}}>
					{" "}
					IVMS{" "}
				</Typography>
			</Link>

			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 25,
					padding: 1,
				}}>
				<ShoppingCartIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<PhoneForwardedIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<StorageIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<PhoneCallbackIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
		</Box>
	);
}
export default RetailerSidebar;
