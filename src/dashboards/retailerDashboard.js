import "./retailerDashboard.css";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import RetailerSidebar from "../components/sidebars/retailerSidebar";
import RetailerOptions from "../components/options/retailerOptions";
import ProfileInformation from "../components/profileInformation";
import NotificationButton from "../components/notificationButton";
import WelcomeBox from "../components/welcomeBox";
import LogoutButton from "../components/logout";
import { Link } from "react-router-dom";

function RetailerDashboard({ setAuth }) {
	useEffect(() => {
		setAuth(true);
	}, []);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 2, marginTop: 3 }}>
					<Link to="/dashboard/retailer/notifications">
						<NotificationButton />
					</Link>
					<WelcomeBox />
					<RetailerOptions />
				</Stack>

				<Stack direction={"column"}>
					<ProfileInformation />
					<LogoutButton setAuth={setAuth} />
				</Stack>
			</Stack>
		</div>
	);
}
export default RetailerDashboard;
