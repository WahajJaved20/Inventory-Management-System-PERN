import { React } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
function LogoutButton() {
	return (
		<Link to="/" style={{ textDecoration: "none" }}>
			<Button
				sx={{
					backgroundColor: "#4163CF",
					borderRadius: 4,
					marginLeft: 2,
					marginTop: 3,
					width: 390,
					height: 80,
				}}>
				<Stack direction={"row"}>
					<Typography
						sx={{
							color: "white",
							fontSize: 25,
							fontWeight: "bold",
							marginTop: 1,
						}}>
						Log Out
					</Typography>
					<LogoutIcon
						sx={{
							color: "black",
							fontSize: 40,
							marginLeft: 18,
							marginTop: 0.5,
						}}
					/>
				</Stack>
			</Button>
		</Link>
	);
}
export default LogoutButton;
