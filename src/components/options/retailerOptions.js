import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import StorageIcon from "@mui/icons-material/Storage";
function RetailerOptions() {
	return (
		<>
			<Stack direction={"row"} sx={{ marginTop: 3 }}>
				<Button
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
								ORDERINGS
							</Typography>
						</Stack>
						<ShoppingCartIcon
							sx={{
								color: "#2bbab4",
								fontSize: 160,
								marginLeft: 4,
							}}
						/>
					</Stack>
				</Button>
				<Button
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
				<Button
					sx={{
						backgroundColor: "#2F2F43",
						borderRadius: 4,
						height: 200,
						width: 500,
					}}>
					<Stack
						direction={"row"}
						sx={{ marginLeft: 1, textAlign: "left" }}>
						<Stack
							direction={"column"}
							sx={{ marginTop: 4, marginRight: 2 }}>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Storage
							</Typography>
						</Stack>
						<StorageIcon
							sx={{
								color: "#2bbab4",
								fontSize: 160,
								marginLeft: 10,
							}}
						/>
					</Stack>
				</Button>
				<Button
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
