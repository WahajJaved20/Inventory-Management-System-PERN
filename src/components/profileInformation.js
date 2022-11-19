import  React  from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack, Box, Typography, Avatar } from "@mui/material";
function ProfileInformation() {
	return (
		<Stack direction={"column"} sx={{ marginLeft: 2 }}>
			<Box
				sx={{
					width: 350,
					marginTop: 3,
					paddingLeft: 5,
					height: 80,
					backgroundColor: "#4163CF",
					borderRadius: 4,
				}}>
				<Typography
					sx={{
						marginLeft: 1,
						marginTop: 3,
						color: "white",
						fontWeight: "bold",
						fontSize: 25,
					}}>
					MY PROFILE
				</Typography>
			</Box>
			<Box
				sx={{
					width: 350,
					paddingLeft: 5,
					height: 200,
					backgroundColor: "#2F2F43",
					borderRadius: 4,
				}}>
				<Stack direction={"row"}>
					<Avatar
						sx={{
							backgroundColor: "#4163CF",
							width: 100,
							height: 100,
							fontSize: 60,
							fontWeight: "bold",
							marginTop: 6,
						}}>
						W
					</Avatar>
					<Stack direction={"column"}>
						<Typography
							sx={{
								color: "white",
								fontSize: 25,
								fontWeight: "bold",
								marginLeft: 4,
								marginTop: 6,
							}}>
							ADMIN
						</Typography>
						<Typography
							sx={{
								color: "white",
								fontSize: 20,
								fontWeight: "bold",
								marginLeft: 4,
								marginTop: 0.4,
							}}>
							IVMS
						</Typography>
						<Stack direction={"row"}>
							<LocationOnIcon
								sx={{
									color: "white",
									marginLeft: 3,
									marginTop: 0.4,
								}}
							/>
							<Typography
								sx={{
									color: "white",
									fontSize: 18,
									fontWeight: "bold",

									marginTop: 0.4,
								}}>
								Karachi, Pakistan
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
}
export default ProfileInformation;
