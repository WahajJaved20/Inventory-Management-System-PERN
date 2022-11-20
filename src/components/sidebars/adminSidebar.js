import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyIcon from "@mui/icons-material/Key";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupIcon from "@mui/icons-material/Group";

function AdminSidebar() {
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
			<Link to="/dashboard/admin" style={{ textDecoration: "none" }}>
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
				to="/dashboard/admin/approval"
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 25,
						padding: 1,
					}}>
					<AccessTimeIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to="/dashboard/admin/userAccesses"
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<KeyIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to="/dashboard/admin/revokeAccesses"
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<DeleteForeverIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
			<Link
				to="/dashboard/admin/viewClients"
				style={{ textDecoration: "none" }}>
				<Button
					sx={{
						backgroundColor: "#738CE4",
						borderRadius: 4,
						marginTop: 2,
						padding: 1,
					}}>
					<GroupIcon sx={{ fontSize: 40, color: "black" }} />
				</Button>
			</Link>
		</Box>
	);
}
export default AdminSidebar;
