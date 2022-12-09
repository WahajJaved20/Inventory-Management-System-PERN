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
function RevokeAccessPage() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [retailers, setRetailers] = React.useState([]);
	const [dataOpen, setDataOpen] = React.useState(false);
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
					Mobile_Number: pr.r_mobile_num,
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
			field: "Mobile_Number",
			headerName: "Mobile_Number",
			width: 400,
		},
	];
	const handleDataOpen = () => {
		setDataOpen(true);
	};
	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function handleDeletion() {
		const token = localStorage.getItem("token");
		const r_id = localStorage.getItem("id");
		try {
			const inputs = { r_id: r_id };

			const response = await fetch(
				"http://localhost:5000/access/handleRetailerDeletion",
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
			handleDataClose();
			localStorage.removeItem("id");
			getRetailers();
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
						sx={{
							fontSize: 40,
							marginLeft: 70,
							marginBottom: 1,
							color: "white",
						}}>
						RETAILER ACCESSES
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
									color: "white",
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
						sx={{
							marginTop: 2,
							fontSize: 20,
							width: 1200,
							color: "white",
							"& .MuiDataGrid-cell": {
								color: "white",
								backgroundColor: "#29292b",
							},
						}}
						onRowDoubleClick={(e) => {
							handleDataOpen();
							localStorage.setItem("id", e.row.id);
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
						<DialogTitle>{"REVOKE ACCESS"}</DialogTitle>
						<DialogActions>
							<Button onClick={handleDataClose}>Close</Button>
						</DialogActions>
						<DialogActions>
							<Button
								onClick={() => {
									handleDeletion();
								}}>
								REVOKE{" "}
							</Button>
						</DialogActions>
					</Dialog>
				</Stack>
			</Stack>
		</div>
	);
}
export default RevokeAccessPage;
