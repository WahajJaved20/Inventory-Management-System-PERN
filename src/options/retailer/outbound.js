import React, { useEffect } from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import CustomizedSnackbars from "../../components/alerts/authAlerts";

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
	MenuItem,
	Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function OutboundPage() {
	const columns = [
		{ field: "id", headerName: "Outbound_ID", width: 200 },
		{ field: "Product_Name", headerName: "Product_Name", width: 300 },
		{ field: "Product_Count", headerName: "Product_Count", width: 300 },
		{ field: "Reciever_ID", headerName: "Reciever_ID", width: 300 },
	];

	const [rows, setRows] = React.useState([]);
	const [dataOpen, setDataOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [recievers, setRecievers] = React.useState([]);
	const [products, setProducts] = React.useState([]);
	const [reciever, setReciever] = React.useState("");
	const [product, setProduct] = React.useState("");
	const [productCount, setProductCount] = React.useState();
	const [message, setMessage] = React.useState("");
	const [errOpen, setErrOpen] = React.useState(false);
	const handleDataOpen = () => {
		setDataOpen(true);
	};

	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function handleAddApproval() {
		const token = localStorage.getItem("token");
		if (!productCount || !parseInt(productCount) || productCount <= 0) {
			setMessage("Count should be positive");
			setErrOpen(true);
			return;
		}
		if (!reciever) {
			setMessage("Reciever Name is mandatory");
			setErrOpen(true);
			return;
		}
		if (!product) {
			setMessage("Product Name is Mandatory");
			setErrOpen(true);
			return;
		}
		try {
			const inputs = {
				count: productCount,
				recv_name: reciever,
				id: product,
			};

			const response = await fetch(
				"http://localhost:5000/dashboard/addOutbound",
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
			if (parseRes === "exceeded") {
				setMessage("Cannot send more products than currently existing");
				setErrOpen(true);
				return;
			}
			const history = {
				id: parseRes.outbound_id,
			};
			const response2 = await fetch(
				"http://localhost:5000/dashboard/sendOutboundHistory",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(history),
				}
			);
			const parseRes2 = await response2.json();
			console.log(parseRes2);
			setProductCount("");
			setProduct("");
			setReciever("");
			handleDataClose();
			getOutboundList();
		} catch (err) {
			console.error(err);
		}
	}
	async function getProductsList() {
		const token = localStorage.getItem("token");
		try {
			const inputs = { name: "" };
			const response = await fetch(
				"http://localhost:5000/dashboard/getProducts",
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
			setProducts(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	async function getOutboundList() {
		const token = localStorage.getItem("token");
		try {
			const inputs = {
				name: searchQuery,
			};
			const response = await fetch(
				"http://localhost:5000/dashboard/getOutbound",
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
					id: pr.outbound_id,
					Product_Name: pr.product_name,
					Product_Count: pr.product_name,
					Reciever_ID: pr.reciever_id,
				});
			});
			setRows(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	async function getRecieversList() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/dashboard/getReciever",
				{
					method: "GET",
					headers: {
						jwt_token: token,
					},
				}
			);
			const parseRes = await response.json();
			console.log(parseRes);
			setRecievers(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getOutboundList();
		getRecieversList();
		getProductsList();
	}, [searchQuery]);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<Typography
						sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1 }}>
						OUTBOUND
					</Typography>
					<CustomizedSnackbars
						open={errOpen}
						setOpen={setErrOpen}
						message={message}
						type={"error"}
					/>
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
					<Grid container spacing={2} sx={{ marginTop: 1 }}>
						<Grid item xs={3}>
							<Button
								onClick={handleDataOpen}
								variant={"contained"}
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 400,
									fontSize: 25,
									fontWeight: "bold",
								}}>
								✨DISPATCH✨ PRODUCT✈
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
					<Dialog
						open={dataOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleDataClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"PRODUCT DETAILS"}</DialogTitle>
						<DialogContent>
							<DialogContentText>Count :</DialogContentText>
							<TextField
								error={!productCount || productCount <= 0}
								value={productCount}
								variant="standard"
								onChange={(e) => {
									setProductCount(e.target.value);
								}}
							/>
							<Divider />
							<FormControl
								variant="standard"
								sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="demo-simple-select-standard-label">
									Reciever
								</InputLabel>
								<Select
									error={reciever === ""}
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={reciever}
									onChange={(e) => {
										setReciever(e.target.value);
									}}
									label="Sender">
									{recievers ? (
										recievers.map((rec) => (
											<MenuItem value={rec.r_name}>
												{rec.r_name}
											</MenuItem>
										))
									) : (
										<MenuItem value="">Noone</MenuItem>
									)}
								</Select>
							</FormControl>
							<Divider />

							<FormControl
								variant="standard"
								sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="demo-simple-select-standard-label">
									Product
								</InputLabel>
								<Select
									error={product === ""}
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={product}
									onChange={(e) => {
										setProduct(e.target.value);
									}}
									label="Sender">
									{products ? (
										products.map((sen) => (
											<MenuItem value={sen.product_id}>
												{sen.product_name}
											</MenuItem>
										))
									) : (
										<MenuItem value="">Noone</MenuItem>
									)}
								</Select>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDataClose}>Close</Button>
						</DialogActions>
						<DialogActions>
							<Button onClick={handleAddApproval}>Approve</Button>
						</DialogActions>
					</Dialog>
				</Stack>
			</Stack>
		</div>
	);
}
export default OutboundPage;
