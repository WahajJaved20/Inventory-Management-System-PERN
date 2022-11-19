import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
function CustomerOptions() {
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
								Buy
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Products
							</Typography>
						</Stack>
						<AddShoppingCartIcon
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
								View
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Cart
							</Typography>
						</Stack>
						<LocalAtmIcon
							sx={{
								color: "#2bbab4",
								fontSize: 160,
								marginLeft: 4,
							}}
						/>
					</Stack>
				</Button>
			</Stack>
		</>
	);
}
export default CustomerOptions;
