import React, { useEffect } from "react";
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
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Divider,
	TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function InboundPage() {
	const columns = [
		{ field: "id", headerName: "Inbound_ID", width: 200 },
		{ field: "Product_I9D", headerName: "Product_ID", width: 300 },
		{ field: "Product_Count", headerName: "Product_Count", width: 300 },
		{ field: "Sender_ID", headerName: "Sender_ID", width: 300 },
	];
	const [rows, setRows] = React.useState([
		{
			id: 1,
			Product_ID: "nigga",
			Product_Count: "haha",
			Sender_ID: 69,
		},
	]);

	const [dataOpen, setDataOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [productName, setProductName] = React.useState("");
	const [productCount, setProductCount] = React.useState("");
	const [productType, setProductType] = React.useState("");
	const [productDescription, setProductDescription] = React.useState("");
	const [existOpen, setExistOpen] = React.useState(false);
	const handleDataOpen = () => {
		setDataOpen(true);
	};

	const handleDataClose = () => {
		setDataOpen(false);
	};
	const handleExistOpen = () => {
		setExistOpen(true);
	};

	const handleExistClose = () => {
		setExistOpen(false);
	};
	async function handleAddApproval() {
		const token = localStorage.getItem("token");
		try {
			const inputs = {
				name: productName,
				count: productCount,
				type: productType,
				description: productDescription,
			};

			const response = await fetch(
				"http://localhost:5000/dashboard/addProduct",
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
			setProductName("");
			setProductType("");
			setProductCount("");
			setProductDescription("");
			handleExistClose();
			getInboundList();
		} catch (err) {
			console.error(err);
		}
	}
	async function getInboundList() {
		const token = localStorage.getItem("token");
		try {
			const inputs = {
				name: searchQuery,
			};
			const response = await fetch(
				"http://localhost:5000/dashboard/getInbound",
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
					id: pr.product_id,
					Product_ID: pr.product_name,
					Product_Count: pr.product_count,
					Sender_ID: pr.sender_id,
				});
			});
			setRows(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getInboundList();
	}, []);
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
								onClick={handleDataOpen}
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
							<Dialog
								open={dataOpen}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleDataClose}
								aria-describedby="alert-dialog-slide-description">
								<DialogTitle>{"ADD PRODUCT"}</DialogTitle>
								<DialogContent>
									<Button>Add Existing</Button>
									<Divider />
									<Button
										onClick={() => {
											handleDataClose();
											handleExistOpen();
										}}>
										Add New
									</Button>
								</DialogContent>
							</Dialog>
							<Dialog
								open={existOpen}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleExistClose}
								aria-describedby="alert-dialog-slide-description">
								<DialogTitle>{"PRODUCT DETAILS"}</DialogTitle>
								<DialogContent>
									<DialogContentText>Name:</DialogContentText>
									<TextField
										value={productName}
										variant="standard"
										onChange={(e) => {
											setProductName(e.target.value);
										}}
									/>
									<Divider />
									<DialogContentText>Type:</DialogContentText>
									<TextField
										value={productType}
										variant="standard"
										onChange={(e) => {
											setProductType(e.target.value);
										}}
									/>
									<Divider />
									<DialogContentText>
										Description:
									</DialogContentText>
									<TextField
										value={productDescription}
										variant="standard"
										onChange={(e) => {
											setProductDescription(
												e.target.value
											);
										}}
									/>
									<Divider />
									<DialogContentText>
										Count :
									</DialogContentText>
									<TextField
										value={productCount}
										variant="standard"
										onChange={(e) => {
											setProductCount(e.target.value);
										}}
									/>
									<Divider />
								</DialogContent>
								<DialogActions>
									<Button onClick={handleExistClose}>
										Close
									</Button>
								</DialogActions>
								<DialogActions>
									<Button onClick={handleAddApproval}>
										Approve
									</Button>
								</DialogActions>
							</Dialog>
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
				</Stack>
			</Stack>
		</div>
	);
}
export default InboundPage;
