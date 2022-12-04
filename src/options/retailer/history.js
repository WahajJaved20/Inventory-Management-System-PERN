import React, { useEffect } from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import {
	Stack,
	Typography,
	Slide,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RowSelection from "./dialogs/rowSelect";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function HistoryPage() {
	useEffect(() => {}, []);
	const columns = [
		{ field: "id", headerName: "Transaction_ID", width: 200 },
		{
			field: "Transaction_Status",
			headerName: "Transaction_Status",
			width: 300,
		},
		{ field: "Inventory_ID", headerName: "Inventory_ID", width: 300 },
		{ field: "Date", headerName: "Date", width: 300 },
	];
	const rows = [
		{
			id: 1,
			Transaction_Status: "pending",
			Inventory_ID: 69,
			Date: "2022-10-10",
		},
	];
	const [dataOpen, setDataOpen] = React.useState(false);
	const handleDataOpen = () => {
		setDataOpen(true);
	};

	const handleDataClose = () => {
		setDataOpen(false);
	};
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1 }}>
						HISTORY
					</Typography>
					<FormControl variant="standard">
						<Stack direction={"column"}>
							<OutlinedInput
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											sx={{
												color: "black",
												mr: 1,
												my: 0.5,
												fontSize: "50px",
											}}>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#05447a",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
								}}
							/>
							<InputLabel
								style={{ fontSize: 20, marginTop: -10 }}
								sx={{
									color: "white",
									marginLeft: 2,
								}}>
								<Typography
									sx={{ fontSize: 25, fontWeight: "bold" }}>
									Search
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<DataGrid
						onRowDoubleClick={handleDataOpen}
						sx={{ marginTop: 2, fontSize: 20, width: 1200 }}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						rows={rows}
					/>
					<RowSelection
						open={dataOpen}
						Transition={Transition}
						handleClose={handleDataClose}
					/>
				</Stack>
			</Stack>
		</div>
	);
}
export default HistoryPage;
