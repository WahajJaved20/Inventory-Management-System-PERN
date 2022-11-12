import { React } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import "./adminDashboard.css";
function AdminDashboard() {
	return (
		<div className="co">
			<Stack direction={"row"} sx={{ width: 1, height: "100%" }}>
				<Box
					className="sidebar"
					sx={{
						width: 0.07,
						height: "100%",
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
							marginTop: 50,
						}}>
						<AccessTimeIcon sx={{ fontSize: 40, color: "black" }} />
					</Button>
				</Box>
			</Stack>
		</div>
	);
}
export default AdminDashboard;
