import { Stack, Box, Typography, Button, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
import GetMaxCount from "./dialogs/getCount";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function PendingApprovals() {
	const [notifications, setNotifications] = useState([]);
	const [dataOpen, setDataOpen] = React.useState(false);
	const handleDataOpen = (notif) => {
		localStorage.setItem("notif", notif["r_id"]);
		setDataOpen(true);
	};

	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function getNotifications() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/notif/getAdminNotifications",
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
	async function handleRejection(e) {
		const token = localStorage.getItem("token");
		try {
			const inputs = { r_id: e["r_id"] };

			const response = await fetch(
				"http://localhost:5000/notif/handleRetailerRejection",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			console.log(parseRes);
			getNotifications();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="co">
			<Stack direction={"row"}>
				<AdminSidebar />
				<GetMaxCount
					Transition={Transition}
					handleClose={handleDataClose}
					open={dataOpen}
					getNotifications={getNotifications}
				/>
				<Stack
					direction={"column"}
					sx={{ marginTop: 3, marginLeft: 3 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, color: "white" }}>
						PENDING APPROVALS
					</Typography>
					{notifications.length !== 0 ? (
						notifications.map((notif) => {
							return (
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
											}}>
											Company Name: {notif.r_name}
										</Typography>
										<Typography
											sx={{
												fontSize: 25,
												marginRight: 10,
												marginTop: 1,
											}}>
											Message: {notif.string}
										</Typography>
										<Button
											onClick={() =>
												handleDataOpen(notif)
											}
											variant="contained"
											color="success"
											sx={{
												marginLeft: 20,
												width: 150,
												height: 50,
												fontWeight: "bold",
												marginRight: 10,
											}}>
											Approve
										</Button>
										<Button
											onClick={() =>
												handleRejection(notif)
											}
											variant="contained"
											color="error"
											sx={{
												width: 150,
												height: 50,
												fontWeight: "bold",
											}}>
											Reject
										</Button>
									</Stack>
								</Box>
							);
						})
					) : (
						<Typography
							sx={{
								fontSize: 40,
								marginLeft: 70,
								marginTop: 40,
								color: "white",
							}}>
							NOTHING TO SEE HERE
						</Typography>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
export default PendingApprovals;
