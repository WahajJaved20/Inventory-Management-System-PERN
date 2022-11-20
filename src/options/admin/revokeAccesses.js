import { Stack, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
function RevokeAccesses() {
	const [retailers, setRetailers] = useState([]);
	async function getRetailers() {
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
			setRetailers(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getRetailers();
	}, [retailers]);
	async function handleDeletion(e) {
		const token = localStorage.getItem("token");
		try {
			console.log(e);
			const inputs = { c_id: e["c_id"] };

			const response = await fetch(
				"http://localhost:5000/access/handleRetailerDeletion",
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
			getRetailers();
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<div className="co">
			<Stack direction={"row"}>
				<AdminSidebar />
				<Stack
					direction={"column"}
					sx={{ marginTop: 3, marginLeft: 3 }}>
					<Typography sx={{ fontSize: 40, marginLeft: 70 }}>
						RETAILER ACCESSES
					</Typography>
					{retailers.length !== 0 ? (
						retailers.map((ret) => {
							return (
								<Box
									key={ret.r_id}
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
											Name: {ret.r_username}
										</Typography>
										<Typography
											sx={{
												fontSize: 25,
												marginRight: 10,
												marginTop: 1,
											}}>
											Status:{" "}
											{ret.r_approval_status === true
												? "Approved"
												: "Pending"}
										</Typography>
										<Typography
											sx={{
												fontSize: 25,
												marginRight: 10,
												marginTop: 1,
											}}>
											Inventory ID: {ret.inventory_id}
										</Typography>
										<Button
											onClick={() => handleDeletion(ret)}
											variant="contained"
											color="error"
											sx={{
												width: 150,
												height: 50,
												fontWeight: "bold",
											}}>
											Delete Account
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
							}}>
							NO RETAILERS YET
						</Typography>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
export default RevokeAccesses;
