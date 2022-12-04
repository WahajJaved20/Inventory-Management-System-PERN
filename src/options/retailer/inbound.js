import React from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import {
	Stack,
	Button,
	Grid,
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
function InboundPage() {
	const columns = [
		{ field: "id", headerName: "Inbound_ID", width: 200 },
		{ field: "Product_ID", headerName: "Product_ID", width: 300 },
		{ field: "Product_Count", headerName: "Product_Count", width: 300 },
		{ field: "Sender_ID", headerName: "Sender_ID", width: 300 },
	];

	const rows = [
		{ id: 1, Product_ID: "nigga", Product_Count: "haha", Sender_ID: 69 },
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
						INBOUND
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
					<Grid container spacing={2} sx={{ marginTop: 1 }}>
						<Grid item xs={3}>
							<Button
								variant={"contained"}
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 300,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								ADD PRODUCT
							</Button>
						</Grid>
					</Grid>
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
export default InboundPage;
