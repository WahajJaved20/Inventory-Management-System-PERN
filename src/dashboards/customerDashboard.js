import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import NotificationButton from "../components/notificationButton";
import WelcomeBox from "../components/welcomeBox";
import ProfileInformation from "../components/profileInformation";
import LogoutButton from "../components/logout";
import CustomerSidebar from "../components/sidebars/customerSidebar";
import CustomerOptions from "../components/options/customerOptions";
import "./customerDashboard.css";
function CustomerDashboard({ setAuth }) {
	useEffect(() => {
		window.location.reload(true);
	}, []);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<CustomerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 2, marginTop: 3 }}>
					<NotificationButton />
					<WelcomeBox />
					<CustomerOptions />
				</Stack>

				<Stack direction={"column"}>
					<ProfileInformation />
					<LogoutButton setAuth={setAuth} />
				</Stack>
			</Stack>
		</div>
	);
}
export default CustomerDashboard;
