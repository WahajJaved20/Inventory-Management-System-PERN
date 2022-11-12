import React from "react";
import { Stack } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import "./navbar.css";
function AuthNavbar() {
	return (
		<div className="navbarL">
			<Stack direction={"row"}>
				<Grid sx={{ mt: 3 }} container spacing={1}>
					<Grid item xs={2}>
						<InventoryIcon
							style={{ color: "white" }}
							fontSize="large"
						/>
					</Grid>
					<Grid
						item
						xs={2}
						paddingBottom={20}
						sx={{ ml: -18, mt: -0.5 }}>
						<Typography variant="h4" style={{ color: "white" }}>
							IVMS
						</Typography>
					</Grid>
				</Grid>
			</Stack>
		</div>
	);
}
export default AuthNavbar;
