import React, { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorageIcon from "@mui/icons-material/Storage";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
function RetailerOptions() {
	const [approved, setApproved] = useState(false);
	async function getApprovalStatus() {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				"http://localhost:5000/dashboard/getRetailerStatus",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const parseRes = await response.json();
			console.log(parseRes);
			if (parseRes === "TRUE") {
				setApproved(true);
			}
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getApprovalStatus();
	}, []);
	return (
		<>
			<Stack direction={"row"} sx={{ marginTop: 3 }}>
				<Link
					to="/dashboard/retailer/history"
					style={{ textDecoration: "none" }}>
					<Button
						disabled={!approved}
						sx={{
							backgroundColor: "#2F2F43",
							borderRadius: 4,
							height: 200,
							width: 500,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack direction={"column"} sx={{ marginTop: 4 }}>
								<Typography
									sx={{
										fontSize: 35,
										fontWeight: "bold",
										color: "white",
										marginTop: 3,
										marginRight: 2,
									}}>
									HISTORY
								</Typography>
							</Stack>
							<HistoryIcon
								sx={{
									color: "#2bbab4",
									fontSize: 160,
									marginLeft: 4,
								}}
							/>
						</Stack>
					</Button>
				</Link>
				<Button
					disabled={!approved}
					sx={{
						marginLeft: 5,
						backgroundColor: "#2F2F43",
						borderRadius: 4,
						height: 200,
						width: 500,
					}}>
					<Stack
						direction={"row"}
						sx={{ marginLeft: 1, textAlign: "left" }}>
						<Stack direction={"column"} sx={{ marginTop: 4 }}>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Out
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Bound
							</Typography>
						</Stack>
						<PhoneForwardedIcon
							sx={{
								color: "#2bbab4",
								fontSize: 160,
								marginLeft: 4,
							}}
						/>
					</Stack>
				</Button>
			</Stack>
			<Stack direction={"row"} sx={{ marginTop: 3 }}>
				<Link
					to="/dashboard/retailer/inventory"
					style={{ textDecoration: "none" }}>
					<Button
						disabled={!approved}
						sx={{
							backgroundColor: "#2F2F43",
							borderRadius: 4,
							height: 200,
							width: 500,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack direction={"column"} sx={{ marginTop: 4 }}>
								<Typography
									sx={{
										fontSize: 35,
										fontWeight: "bold",
										color: "white",
									}}>
									INVENTORY
								</Typography>
							</Stack>
							<StorageIcon
								sx={{
									color: "#2bbab4",
									fontSize: 160,
									marginLeft: 5,
								}}
							/>
						</Stack>
					</Button>
				</Link>
				<Button
					disabled={!approved}
					sx={{
						marginLeft: 5,
						backgroundColor: "#2F2F43",
						borderRadius: 4,
						height: 200,
						width: 500,
					}}>
					<Stack
						direction={"row"}
						sx={{ marginLeft: 1, textAlign: "left" }}>
						<Stack direction={"column"} sx={{ marginTop: 4 }}>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								In
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Bound
							</Typography>
						</Stack>
						<PhoneCallbackIcon
							sx={{
								color: "#2bbab4",
								fontSize: 160,
								marginLeft: 8,
							}}
						/>
					</Stack>
				</Button>
			</Stack>
		</>
	);
}
export default RetailerOptions;
