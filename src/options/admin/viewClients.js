import { Stack, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
function ViewClients() {
	const [clients, setClients] = useState([]);
	async function getClients() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/access/getListOfRetailers",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const parseRes = await response.json();
			setClients(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getClients();
	}, [clients]);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<AdminSidebar />
				<Stack
					direction={"column"}
					sx={{ marginTop: 3, marginLeft: 3 }}>
					<Typography sx={{ fontSize: 40, marginLeft: 70 }}>
						LIST OF CLIENTS
					</Typography>
					{clients.length !== 0 ? (
						clients.map((cl) => {
							return (
								<Box
									key={cl.r_id}
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
											Name: {cl.r_name}
										</Typography>
										<Typography
											sx={{
												fontSize: 25,
												marginRight: 10,
												marginTop: 1,
											}}>
											Inventory_ID: {cl.inventory_id}
										</Typography>
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
							}}>
							NO CLIENTS YET
						</Typography>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
export default ViewClients;
