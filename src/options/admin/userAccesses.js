import React, { useEffect } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
import {
	Stack,
	Typography,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	InputLabel,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
	TextField,
	MenuItem,
	Select,
	Button,
	Slide,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function AdminHistoryPage() {
	const [history, setHistory] = React.useState([]);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [dataOpen, setDataOpen] = React.useState(false);
	const [retailer, setRetailer] = React.useState({});
	const handleDataOpen = () => {
		setDataOpen(true);
	};
	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function getHistory() {
		const token = localStorage.getItem("token");
		try {
			const inputs = { name: searchQuery };
			const response = await fetch(
				"http://localhost:5000/dashboard/getAdminHistory",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			let tempRows = [];
			parseRes.map((pr) => {
				tempRows.push({
					id: pr.history_id,
					ID: pr.inbound_id ? pr.inbound_id : pr.outbound_id,
					Transaction_Status:
						pr.approval_status === "True" ? "Approved" : "Declined",
					Timestamp: pr.entry_time,
					Product_Name: pr.product_name,
					Product_Count: pr.product_count,
					Inventory_ID: pr.inventory_id,
				});
			});
			console.log(tempRows);
			setHistory(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	async function handleQueriedRetailer() {
		const token = localStorage.getItem("token");
		const inventory_ID = localStorage.getItem("inventory_ID");
		try {
			const inputs = { inventory_ID: inventory_ID };

			const response = await fetch(
				"http://localhost:5000/dashboard/getQueriedRetailer",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const parseRes = await response.json();
			setRetailer(parseRes);
			localStorage.removeItem("inventory_ID");
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getHistory();
	}, [searchQuery]);
	const columns = [
		{ field: "id", headerName: "Transaction_ID", width: 200 },
		{
			field: "ID",
			headerName: "ID",
			width: 300,
		},
		{
			field: "Product_Name",
			headerName: "Product_Name",
			width: 300,
		},
		{
			field: "Product_Count",
			headerName: "Product_Count",
			width: 300,
		},
		{
			field: "Transaction_Status",
			headerName: "Transaction_Status",
			width: 300,
		},
		{
			field: "Inventory_ID",
			headerName: "Inventory_ID",
			width: 400,
		},
		{ field: "Timestamp", headerName: "Timestamp", width: 300 },
	];
	return (
		<div className="co">
			<Stack direction={"row"}>
				<AdminSidebar />
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
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
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
						onRowDoubleClick={(e) => {
							localStorage.setItem(
								"inventory_ID",
								e.row.Inventory_ID
							);
							handleDataOpen();
							handleQueriedRetailer();
						}}
						sx={{ marginTop: 2, fontSize: 20, width: 1200 }}
						columns={columns}
						pageSize={7}
						rowsPerPageOptions={[7]}
						rows={history}
					/>
					<Dialog
						open={dataOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleDataClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"TRANSACTION OWNER"}</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Retailer_ID: {retailer["r_id"]}
							</DialogContentText>
							<Divider />
							<DialogContentText>
								Retailer_Name: {retailer["r_name"]}
							</DialogContentText>
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
export default AdminHistoryPage;
