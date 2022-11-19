import React  from "react";
import { Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
function NotificationButton() {
	return (
		<Button
			sx={{
				backgroundColor: "#2F2F43",
				borderRadius: 4,
				marginLeft: 120,
				padding: 1,
			}}>
			<NotificationsIcon
				sx={{ fontSize: 30, color: "yellow", height: 40 }}
			/>
		</Button>
	);
}
export default NotificationButton;
