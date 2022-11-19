import React  from "react";
import { Stack,  Typography, Button } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupsIcon from "@mui/icons-material/Groups";
function AdminOptions() {
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
								Pending
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Approvals
							</Typography>
						</Stack>
						<AccessTimeFilledIcon
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
								User
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Accesses
							</Typography>
						</Stack>
						<CloudUploadIcon
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
								Revoke
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Access
							</Typography>
						</Stack>
						<DeleteSweepIcon
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
								View
							</Typography>
							<Typography
								sx={{
									fontSize: 35,
									fontWeight: "bold",
									color: "white",
								}}>
								Clients
							</Typography>
						</Stack>
						<GroupsIcon
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
export default AdminOptions;
