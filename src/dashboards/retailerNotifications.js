import { Stack, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RetailerSidebar from "../components/sidebars/retailerSidebar";
import { Link } from "react-router-dom";
import "../options/background.css";
function RetailerNotifications() {
	const [notifications, setNotifications] = useState([]);
	async function getNotifications() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/notif/getRetailerNotifications",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const parseRes = await response.json();
			setNotifications(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getNotifications();
	}, [notifications]);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginTop: 3, marginLeft: 3 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, color: "white" }}>
						NOTIFICATIONS
					</Typography>
					{notifications.length !== 0 ? (
						notifications.map((notif) => {
							return (
								<Link
									to="/dashboard/retailer/notifications/inventoryForm"
									style={{ textDecoration: "none" }}>
									<Box
										key={notif.n_id}
										sx={{
											width: "1",
											backgroundColor: "#4163CF",
											padding: 2,
											borderRadius: 5,
											marginBottom: 5,
										}}>
										<Stack direction={"row"}>
											<Typography
												sx={{
													fontSize: 25,
													marginRight: 10,
													marginTop: 1,
													color: "white",
												}}>
												Message: {notif.string}
											</Typography>
										</Stack>
									</Box>
								</Link>
							);
						})
					) : (
						<Typography
							sx={{
								fontSize: 40,
								marginLeft: 70,
								color: "white",
								marginTop: 40,
							}}>
							NOTHING TO SEE HERE
						</Typography>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
export default RetailerNotifications;
