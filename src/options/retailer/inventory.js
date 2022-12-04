import React, { useEffect } from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import SearchBar from "material-ui-search-bar";
import { Stack, Button, Grid, Typography, Slide } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InventoryInformation from "./dialogs/inventoryInfo";
import RowSelection from "./dialogs/rowSelect";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function InventoryPage() {
	const columns = [
		{ field: "id", headerName: "Product_ID", width: 200 },
		{ field: "Product_Name", headerName: "Product_Name", width: 300 },
		{ field: "Count", headerName: "Count", width: 300 },
	];

	const rows = [{ id: 1, Product_Name: "nigga", Count: 69 }];
	const [open, setOpen] = React.useState(false);
	const [dataOpen, setDataOpen] = React.useState(false);
	useEffect(() => {}, [open]);
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
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1 }}>
						INVENTORY
					</Typography>
					<SearchBar
						// onChange={}
						onRequestSearch={() => console.log("onRequestSearch")}
						style={{
							margin: "2 3",
							width: 1000,

							height: 50,
							backgroundColor: "#05447a",
							fontSize: 20,
						}}
					/>
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
								DELETE PRODUCT
							</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								variant={"contained"}
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
								variant={"contained"}
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 380,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								Inventory Details
							</Button>
							<InventoryInformation
								Transition={Transition}
								handleClose={handleClose}
								open={open}
							/>
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
export default InventoryPage;
