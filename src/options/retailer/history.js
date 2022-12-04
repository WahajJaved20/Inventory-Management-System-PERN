import React, { useEffect } from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import SearchBar from "material-ui-search-bar";
import { Stack, Typography, Slide } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RowSelection from "./dialogs/rowSelect";

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
