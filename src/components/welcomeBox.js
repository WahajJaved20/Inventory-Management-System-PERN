import { React } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Stack, Box, Typography } from "@mui/material";
function WelcomeBox() {
	return (
		<Box
			sx={{
				width: 1000,
				marginTop: 3,
				paddingLeft: 5,
				height: 200,
				backgroundColor: "#4163CF",
				borderRadius: 4,
			}}>
			<Stack direction={"column"}>
				<Box
					sx={{
						width: 200,
						marginTop: 2,
						height: 40,
						backgroundColor: "#738CE4",
						borderRadius: 4,
					}}>
					<Stack direction={"row"}>
						<CalendarMonthIcon
							sx={{
								marginLeft: 2,
								fontSize: 30,
								marginTop: 0.5,
							}}
						/>
						<Typography
							sx={{
								marginLeft: 1,
								fontSize: 20,
								marginTop: 0.8,
								color: "white",
							}}>
							Nov 11, 2022
						</Typography>
					</Stack>
				</Box>
				<Typography
					sx={{
						marginLeft: 1,
						fontSize: 36,
						marginTop: 3,
						color: "white",
					}}>
					Good Day, Admin
				</Typography>
				<Typography
					sx={{
						marginLeft: 1,
						fontSize: 24,
						marginTop: 1,
						color: "white",
					}}>
					Have a nice Monday
				</Typography>
			</Stack>
		</Box>
	);
}
export default WelcomeBox;
