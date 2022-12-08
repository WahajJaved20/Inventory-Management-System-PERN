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
function ViewClients() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [retailers, setRetailers] = React.useState([]);
	const [dataOpen, setDataOpen] = React.useState(false);
	const [inventory, setInventory] = React.useState({});
	async function getRetailers() {
		const token = localStorage.getItem("token");
		try {
			const inputs = { name: searchQuery };
			const response = await fetch(
				"http://localhost:5000/access/getListOfRetailers",
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
			console.log(parseRes);
			let tempRows = [];
			parseRes.map((pr) => {
				tempRows.push({
					id: pr.r_id,
					Retailer_Name: pr.r_name,
					Inventory_ID: pr.inventory_id,
				});
			});

			setRetailers(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getRetailers();
	}, [searchQuery]);
	const columns = [
		{ field: "id", headerName: "Retailer_ID", width: 500 },
		{
			field: "Retailer_Name",
			headerName: "Retailer_Name",
			width: 300,
		},
		{
			field: "Inventory_ID",
			headerName: "Inventory_ID",
			width: 400,
		},
	];
	const handleDataOpen = () => {
		setDataOpen(true);
	};
	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function handleQueriedInventory() {
		const token = localStorage.getItem("token");
		const inventory_ID = localStorage.getItem("inventory_ID");
		try {
			const inputs = { inventory_ID: inventory_ID };

			const response = await fetch(
				"http://localhost:5000/dashboard/getQueriedInventory",
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
			setInventory(parseRes);
			localStorage.removeItem("inventory_ID");
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<div className="co">
			<Stack direction={"row"}>
				<AdminSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1 }}>
						LIST OF CLIENTS
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
						sx={{ marginTop: 2, fontSize: 20, width: 1200 }}
						onRowDoubleClick={(e) => {
							localStorage.setItem(
								"inventory_ID",
								e.row.Inventory_ID
							);
							handleDataOpen();
							handleQueriedInventory();
						}}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						rows={retailers}
					/>
					<Dialog
						open={dataOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleDataClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"INVENTORY DETAILS"}</DialogTitle>
						<DialogContent>
							<DialogContentText>
								ID: {inventory["inventory_id"]}
							</DialogContentText>
							<Divider />
							<DialogContentText>
								TYPE: {inventory["inventory_type"]}
							</DialogContentText>
							<Divider />
							<DialogContentText>
								Count: {inventory["inventory_count"]}
							</DialogContentText>
							<Divider />
							<DialogContentText>
								Max Count: {inventory["inventory_max_count"]}
							</DialogContentText>
							<Divider />
							<DialogContentText>
								Description:{" "}
								{inventory["inventory_description"]}
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
export default ViewClients;
