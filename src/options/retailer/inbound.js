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
	MenuItem,
	Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedSnackbars from "../../components/alerts/authAlerts";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function InboundPage() {
	const columns = [
		{ field: "id", headerName: "Inbound_ID", width: 200 },
		{ field: "Product_Name", headerName: "Product_Name", width: 300 },
		{ field: "Product_Count", headerName: "Product_Count", width: 300 },
		{ field: "Sender_Name", headerName: "Sender_Name", width: 300 },
		{ field: "Approval_Status", headerName: "Approval_Status", width: 300 },
	];
	const [rows, setRows] = React.useState([]);
	const [errOpen, setErrOpen] = React.useState(false);
	const [message, setMessage] = React.useState("");
	const [dataOpen, setDataOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [productName, setProductName] = React.useState("");
	const [productCount, setProductCount] = React.useState("");
	const [productType, setProductType] = React.useState("");
	const [productDescription, setProductDescription] = React.useState("");
	const [existOpen, setExistOpen] = React.useState(false);
	const [sender, setSender] = React.useState("");
	const [senders, setSenders] = React.useState([]);
	const [app, setApp] = React.useState(false);
	const [products, setProducts] = React.useState([]);
	const [product, setProduct] = React.useState("");
	const [productOpen, setProductOpen] = React.useState(false);
	const [confirmation, setConfirmationOpen] = React.useState(false);
	const handleDataOpen = () => {
		setDataOpen(true);
	};
	const handleDataClose = () => {
		setDataOpen(false);
	};
	const handleConfirmationOpen = () => {
		setConfirmationOpen(true);
	};
	const handleConfirmationClose = () => {
		setConfirmationOpen(false);
	};
	const handleProductOpen = () => {
		setProductOpen(true);
	};
	const handleProductClose = () => {
		setProductOpen(false);
	};
	const handleAppOpen = () => {
		setApp(true);
	};
	const handleAppClose = () => {
		setApp(false);
	};
	const handleExistOpen = () => {
		setExistOpen(true);
	};

	const handleExistClose = () => {
		setExistOpen(false);
	};
	async function getSendersList() {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				"http://localhost:5000/dashboard/getSender",
				{
					method: "GET",
					headers: {
						jwt_token: token,
					},
				}
			);
			const parseRes = await response.json();
			setSenders(parseRes);
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
			console.log(parseRes);
			setProducts(parseRes);
		} catch (err) {
			console.error(err);
		}
	}
	async function handleInboundApproval() {
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("id");
		try {
			const inputs = { id: id };
			const response = await fetch(
				"http://localhost:5000/dashboard/sendInboundHistory",
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
				setMessage("Inventory Count will be exceeded, cannot continue");
				setErrOpen(true);
				return;
			}
			localStorage.removeItem("id");
			getInboundList();
		} catch (err) {
			console.error(err);
		}
	}
	async function handleInboundRejection() {
		const token = localStorage.getItem("token");
		const id = localStorage.getItem("id");
		try {
			const inputs = { id: id };
			const response = await fetch(
				"http://localhost:5000/dashboard/rejectInbound",
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
			localStorage.removeItem("id");
			getInboundList();
		} catch (err) {
			console.error(err);
		}
	}
	async function handleAddApproval() {
		const token = localStorage.getItem("token");
		if (!productName) {
			setMessage("Product Name is Mandatory");
			setErrOpen(true);
			return;
		}
		if (!productType) {
			setMessage("Product Type is Mandatory");
			setErrOpen(true);
			return;
		}
		if (!productDescription) {
			setMessage("Product Description is Mandatory");
			setErrOpen(true);
			return;
		}
		if (
			parseInt(productCount) <= 0 ||
			!productCount ||
			!parseInt(productCount)
		) {
			setMessage("Product Count should be positive");
			setErrOpen(true);
			return;
		}
		if (sender === "") {
			setMessage("Please Select a sender");
			setErrOpen(true);
			return;
		}
		try {
			const inputs = {
				name: productName,
				count: productCount,
				type: productType,
				description: productDescription,
				sendername: sender,
			};

			await fetch("http://localhost:5000/dashboard/addInboundNew", {
				method: "POST",
				headers: {
					jwt_token: token,
					"Content-type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			setProductName("");
			setProductType("");
			setProductCount("");
			setProductDescription("");
			setSender("");
			handleExistClose();
			getInboundList();
		} catch (err) {
			console.error(err);
		}
	}
	async function handleExistingAdd() {
		const token = localStorage.getItem("token");
		if (product === "") {
			setMessage("Product Name is Mandatory");
			setErrOpen(true);
			return;
		}
		if (parseInt(productCount) <= 0 || !productCount) {
			setMessage("Product Count should be positive");
			setErrOpen(true);
			return;
		}
		try {
			const inputs = {
				name: product,
				count: productCount,
			};
			const response = await fetch(
				"http://localhost:5000/dashboard/addInboundExisting",
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
				setMessage("Inventory Count will be exceeded, cannot continue");
				setErrOpen(true);
				return;
			}
			setProductName("");
			setProductType("");
			setProductCount("");
			setProductDescription("");
			setSender("");
			setProduct("");
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
					id: pr.inbound_id,
					Product_Name: pr.product_name,
					Product_Count: pr.product_count,
					Sender_Name: pr.s_name,
					Approval_Status: pr.approval_status,
				});
			});
			setRows(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		getInboundList();
		getSendersList();
		getProductsList();
	}, [searchQuery]);
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<CustomizedSnackbars
						open={errOpen}
						setOpen={setErrOpen}
						message={message}
						type={"error"}
					/>
					<Typography
						sx={{
							fontSize: 40,
							marginLeft: 70,
							marginBottom: 1,
							color: "white",
						}}>
						INBOUND
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
									<Button
										onClick={() => {
											handleDataClose();
											handleProductOpen();
										}}>
										Add Existing
									</Button>
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
										error={productName.length === 0}
										value={productName}
										variant="standard"
										onChange={(e) => {
											setProductName(e.target.value);
										}}
									/>
									<Divider />
									<DialogContentText>Type:</DialogContentText>
									<TextField
										error={productType.length === 0}
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
										error={productDescription.length === 0}
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
										error={productCount <= 0}
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
											Sender
										</InputLabel>
										<Select
											error={sender === ""}
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={sender}
											onChange={(e) => {
												setSender(e.target.value);
											}}
											label="Sender">
											{senders ? (
												senders.map((sen) => (
													<MenuItem value={sen.s_id}>
														{sen.s_name}
													</MenuItem>
												))
											) : (
												<MenuItem value="">
													Noone
												</MenuItem>
											)}
										</Select>
									</FormControl>
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
						onRowDoubleClick={(e) => {
							console.log(e);
							localStorage.setItem("id", e.row.id);
							handleAppOpen();
						}}
						sx={{
							marginTop: 2,
							fontSize: 20,
							width: 1200,
							"& .MuiDataGrid-cell": {
								color: "white",
								backgroundColor: "#29292b",
							},
							color: "white",
						}}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						rows={rows}
					/>
					<Dialog
						open={app}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleAppClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"APPROVAL STATUS"}</DialogTitle>
						<DialogContent>
							<Divider />
							<Button
								onClick={() => {
									handleAppClose();
									handleInboundApproval();
								}}>
								Approve
							</Button>
							<Divider />
							<Button
								onClick={() => {
									handleAppClose();
									handleInboundRejection();
								}}>
								Reject
							</Button>
						</DialogContent>
					</Dialog>
					<Dialog
						open={productOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleProductClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"PRODUCT DETAILS"}</DialogTitle>
						<DialogContent>
							<Divider />

							<FormControl
								variant="standard"
								sx={{ m: 1, minWidth: 120 }}>
								<InputLabel id="demo-simple-select-standard-label">
									Product
								</InputLabel>
								<Select
									labelId="demo-simple-select-standard-label"
									id="demo-simple-select-standard"
									value={product}
									error={product === ""}
									onChange={(e) => {
										setProduct(e.target.value);
									}}
									label="Product">
									{products ? (
										products.map((sen) => (
											<MenuItem value={sen.product_name}>
												{sen.product_name}
											</MenuItem>
										))
									) : (
										<MenuItem value="">Noone</MenuItem>
									)}
								</Select>
							</FormControl>
							<DialogContentText>Count:</DialogContentText>
							<TextField
								error={productCount <= 0}
								value={productCount}
								variant="standard"
								onChange={(e) => {
									setProductCount(e.target.value);
								}}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleProductClose}>Close</Button>
						</DialogActions>
						<DialogActions>
							<Button
								onClick={() => {
									handleConfirmationOpen();
								}}>
								Approve
							</Button>
						</DialogActions>
					</Dialog>
					<Dialog
						open={confirmation}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleConfirmationClose}
						aria-describedby="alert-dialog-slide-description">
						<DialogTitle>{"Are You Sure?"}</DialogTitle>
						<DialogContent>
							<Divider />
							<Button
								onClick={() => {
									handleProductClose();
									handleConfirmationClose();
								}}>
								Cancel
							</Button>
							<Divider />
							<Button
								onClick={() => {
									handleProductClose();
									handleConfirmationClose();
									handleExistingAdd();
								}}>
								Confirm
							</Button>
						</DialogContent>
					</Dialog>
				</Stack>
			</Stack>
		</div>
	);
}
export default InboundPage;
