import React from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import SearchBar from "material-ui-search-bar";
import {
	Stack,
	Button,
	Grid,
	Typography,
	Slide,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function InventoryPage() {
	const columns = [
		{ field: "id", headerName: "ID", width: 200 },
		{ field: "Name", headerName: "Name", width: 300 },
		{ field: "Count", headerName: "Count", width: 300 },
	];
	const rows = [{ id: 1, Name: "nigga", Count: 69 }];
	const [open, setOpen] = React.useState(false);
	const [dataOpen, setDataOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
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
					sx={{ marginLeft: 5, marginTop: 4 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1 }}>
						INVENTORY
					</Typography>
					<SearchBar
						dataSource={rows.id}
						// onChange={}
						onRequestSearch={() => console.log("onRequestSearch")}
						style={{
							margin: "2 3",
							width: 1000,
							maxWidth: 800,
							height: 50,
							backgroundColor: "#05447a",
							fontSize: 20,
						}}
					/>
					<Grid container spacing={5} sx={{ marginTop: 1 }}>
						<Grid item xs={3}>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 200,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								Inbound
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 200,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								Outbound
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 200,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								History
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								onClick={handleClickOpen}
								variant="contained"
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 400,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								Inventory Details
							</Button>
							<Dialog
								open={open}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleClose}
								aria-describedby="alert-dialog-slide-description">
								<DialogTitle>{"INVENTORY DETAILS"}</DialogTitle>
								<DialogContent>
									<DialogContentText>
										ID: haha
									</DialogContentText>
									<Divider />
									<DialogContentText>
										TYPE: haha
									</DialogContentText>
									<Divider />
									<DialogContentText>
										Count: haha
									</DialogContentText>
									<Divider />
									<DialogContentText>
										Max Count: haha
									</DialogContentText>
									<Divider />
									<DialogContentText>
										Description: haha
									</DialogContentText>
									<Divider />
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose}>Close</Button>
								</DialogActions>
							</Dialog>
						</Grid>
					</Grid>
					<DataGrid
						onRowDoubleClick={handleDataOpen}
						sx={{ marginTop: 2, fontSize: 20 }}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						rows={rows}
					/>
					<Dialog
						open={dataOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleDataClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"Options"}</DialogTitle>
						<DialogContent>
							<Button>
								<DialogContentText>INBOUND</DialogContentText>
							</Button>
							<Divider />
							<Button>
								<DialogContentText>OUTBOUND</DialogContentText>
							</Button>
							<Divider />
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDataClose}>Close</Button>
						</DialogActions>
					</Dialog>
				</Stack>
			</Stack>
		</div>
	);
}
export default InventoryPage;
