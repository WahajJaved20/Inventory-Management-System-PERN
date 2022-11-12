import { React } from "react";
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
				<AccessTimeIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<KeyIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<DeleteForeverIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
			<Button
				sx={{
					backgroundColor: "#738CE4",
					borderRadius: 4,
					marginTop: 2,
					padding: 1,
				}}>
				<GroupIcon sx={{ fontSize: 40, color: "black" }} />
			</Button>
		</Box>
	);
}
export default AdminSidebar;
