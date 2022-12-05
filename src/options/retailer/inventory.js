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
import InventoryInformation from "./dialogs/inventoryInfo";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
function InventoryPage() {
	const columns = [
		{ field: "id", headerName: "Product_ID", width: 200 },
		{ field: "Product_Name", headerName: "Product_Name", width: 300 },
		{ field: "Product_Type", headerName: "Product_Type", width: 300 },
		{ field: "Count", headerName: "Count", width: 300 },
		{ field: "Description", headerName: "Description", width: 300 },
	];
	const [rows, setRows] = React.useState([
		{
			id: 1,
			Product_Name: "nigga",
			Product_Type: "haha",
			Count: 69,
			Description: "lmfao gottem",
		},
	]);

	const [open, setOpen] = React.useState(false);
	const [dataOpen, setDataOpen] = React.useState(false);
	const [addOpen, setAddOpen] = React.useState(false);
	const [productName, setProductName] = React.useState("");
	const [productCount, setProductCount] = React.useState("");
	const [productType, setProductType] = React.useState("");
	const [productDescription, setProductDescription] = React.useState("");
	const [inventory, setInventory] = React.useState("");
	const [searchQuery, setSearchQuery] = React.useState("");
	const [productID, setProductID] = React.useState("");
	const [idOpen, setIDOpen] = React.useState(false);
	const handleIDOpen = () => {
		setIDOpen(true);
	};
	const handleIDClose = () => {
		setIDOpen(false);
	};
	const handleAddOpen = () => {
		setAddOpen(true);
	};
	const handleAddClose = () => {
		setAddOpen(false);
	};
	useEffect(() => {
		getProductList();
	}, [
		open,
		searchQuery,
		productName,
		dataOpen,
		addOpen,
		productCount,
		productDescription,
		productType,
	]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleDataOpen = (e) => {
		setDataOpen(true);
	};

	const handleDataClose = () => {
		setDataOpen(false);
	};
	async function handleProductRemoval() {
		const token = localStorage.getItem("token");
		try {
			const inputs = {
				id: productID,
			};

			const response = await fetch(
				"http://localhost:5000/dashboard/removeProduct",
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
			handleIDClose();
			setProductID("");
			getProductList();
		} catch (err) {
			console.error(err);
		}
	}
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
			handleAddClose();
			setProductName("");
			setProductType("");
			setProductCount("");
			setProductDescription("");
			getProductList();
		} catch (err) {
			console.error(err);
		}
	}
	async function getProductList() {
		const token = localStorage.getItem("token");
		try {
			const inputs = {
				name: searchQuery,
			};
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
			let tempRows = [];
			parseRes.map((pr) => {
				tempRows.push({
					id: pr.product_id,
					Product_Name: pr.product_name,
					Product_Type: pr.product_type,
					Description: pr.product_description,
					Count: pr.product_count,
				});
			});
			setRows(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
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
					<FormControl variant="standard">
						<Stack direction={"column"}>
							<OutlinedInput
								onChange={(e) => {
									setSearchQuery(e.target.value);
									getProductList();
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
								variant={"contained"}
								sx={{
									backgroundColor: "#4163CF",
									height: 60,
									width: 300,
									fontSize: 25,
									fontWeight: "bold",
								}}
								onClick={handleAddOpen}>
								ADD PRODUCT
							</Button>
							<Dialog
								open={addOpen}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleAddClose}
								aria-describedby="alert-dialog-slide-description">
								<DialogTitle>{"PRODUCT DETAILS"}</DialogTitle>
								<DialogContent>
									<DialogContentText>Name:</DialogContentText>
									<TextField
										variant="standard"
										defaultValue={productName}
										onChange={(e) => {
											setProductName(e.target.value);
										}}
									/>
									<Divider />
									<DialogContentText>Type:</DialogContentText>
									<TextField
										defaultValue={productType}
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
										defaultValue={productDescription}
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
										defaultValue={productCount}
										variant="standard"
										onChange={(e) => {
											setProductCount(e.target.value);
										}}
									/>
									<Divider />
								</DialogContent>
								<DialogActions>
									<Button onClick={handleAddClose}>
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
						<Grid item xs={3}>
							<Button
								onClick={handleIDOpen}
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
							<Dialog
								open={idOpen}
								TransitionComponent={Transition}
								keepMounted
								onClose={handleIDClose}
								aria-describedby="alert-dialog-slide-description">
								<DialogTitle>{"PRODUCT DETAILS"}</DialogTitle>
								<DialogContent>
									<DialogContentText>ID :</DialogContentText>
									<TextField
										defaultValue={productID}
										variant="standard"
										onChange={(e) => {
											setProductID(e.target.value);
										}}
									/>
									<Divider />
								</DialogContent>
								<DialogActions>
									<Button onClick={handleIDClose}>
										Close
									</Button>
								</DialogActions>
								<DialogActions>
									<Button onClick={handleProductRemoval}>
										Approve
									</Button>
								</DialogActions>
							</Dialog>
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
						onRowDoubleClick={(e) => {
							handleDataOpen(e);
						}}
						sx={{ marginTop: 2, fontSize: 20 }}
						columns={columns}
						pageSize={7}
						rowsPerPageOptions={[7]}
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
							<Button
								onClick={() => {
									handleDataClose();
									handleAddOpen();
								}}>
								<DialogContentText>ADD COUNT</DialogContentText>
							</Button>
							<Divider />
							<Button>
								<DialogContentText>
									DECREASE COUNT
								</DialogContentText>
							</Button>
							<Divider />
							<Button>
								<DialogContentText>
									REMOVE PRODUCT
								</DialogContentText>
							</Button>
							<Divider />
							<Button>
								<DialogContentText>
									EDIT PRODUCT
								</DialogContentText>
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
