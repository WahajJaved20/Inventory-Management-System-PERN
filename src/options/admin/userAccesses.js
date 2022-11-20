import { Stack, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
function UserAccesses() {
	const [customers, setCustomers] = useState([]);
	async function getCustomers() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/access/getListOfCustomers",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const parseRes = await response.json();
			setCustomers(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getCustomers();
	}, [customers]);
	async function handleDeletion(e) {
		const token = localStorage.getItem("token");
		try {
			console.log(e);
			const inputs = { c_id: e["c_id"] };

			const response = await fetch(
				"http://localhost:5000/access/handleCustomerDeletion",
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
			getCustomers();
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
						USER ACCESSES
					</Typography>
					{customers.length !== 0 ? (
						customers.map((cust) => {
							return (
								<Box
									key={cust.c_id}
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
											Customer ID: {cust.c_id}
										</Typography>
										<Typography
											sx={{
												fontSize: 25,
												marginRight: 10,
												marginTop: 1,
											}}>
											Name: {cust.c_username}
										</Typography>
										<Button
											onClick={() => handleDeletion(cust)}
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
							NO CUSTOMERS YET
						</Typography>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
export default UserAccesses;
