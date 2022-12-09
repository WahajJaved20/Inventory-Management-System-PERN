import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorageIcon from "@mui/icons-material/Storage";
import { Link } from "react-router-dom";
function RetailerSidebar() {
	const [approved, setApproved] = useState(false);
	async function getApprovalStatus() {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:5000/dashboard/getRetailerStatus",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const parseRes = await response.json();
			console.log(parseRes);
			if (parseRes === "TRUE") {
				setApproved(true);
			}
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getApprovalStatus();
	}, []);
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
			<Link
				to={
					approved
						? "/dashboard/retailer/history"
						: "/dashboard/retailer"
				}
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 25,
						padding: 1,
					}}>
					<HistoryIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to={
					approved
						? "/dashboard/retailer/outbound"
						: "/dashboard/retailer"
				}
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<PhoneForwardedIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to={
					approved
						? "/dashboard/retailer/inventory"
						: "/dashboard/retailer"
				}
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<StorageIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to={
					approved
						? "/dashboard/retailer/inbound"
						: "/dashboard/retailer"
				}
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<PhoneCallbackIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
		</Box>
	);
}
export default RetailerSidebar;
