import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./auth/login";
import {
	Routes,
	Route,
	BrowserRouter as Router,
	Navigate,
} from "react-router-dom";
import RegisterPage from "./auth/registerScreen";
import RetailerRegister from "./auth/retailerRegister";
import AdminDashboard from "./dashboards/adminDashboard";
import RetailerDashboard from "./dashboards/retailerDashboard";
import { Fragment } from "react";
import PendingApprovals from "./options/admin/pendingApprovals";
import RevokeAccessPage from "./options/admin/revokeAccesses";
import ViewClients from "./options/admin/viewClients";
import RetailerNotifications from "./dashboards/retailerNotifications";
import InventoryForm from "./components/inventoryForm";
import InventoryPage from "./options/retailer/inventory";
import HistoryPage from "./options/retailer/history";
import InboundPage from "./options/retailer/inbound";
import OutboundPage from "./options/retailer/outbound";
import AdminHistoryPage from "./options/admin/userAccesses";
function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [type, setType] = useState();
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	async function isAuth() {
		const token = localStorage.getItem("token");
		try {
			console.log("trying...");
			const response = await fetch(
				"http://localhost:5000/authentication/verify",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const res = await response.json();
			if (res === true) {
				setAuth(true);
			}
		} catch (err) {
			console.error(err);
			setAuth(false);
		}
	}
	useEffect(() => {
		console.log(isAuthenticated);
		setType(localStorage.getItem("type"));
		if (type !== null) {
			isAuth();
		}
	}, [isAuthenticated]);
	return (
		<Fragment>
			<div className="App">
				<Router>
					<Routes>
						<Route
							exact
							path="/"
							element={
								!isAuthenticated ? (
									<Login setAuth={setAuth} />
								) : type === "admin" ? (
									<Navigate
										to="/dashboard/admin"
										setAuth={setAuth}
									/>
								) : type === "retailer" ? (
									<Navigate
										to="/dashboard/retailer"
										setAuth={setAuth}
									/>
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>
						<Route
							exact
							path="/register"
							element={
								!isAuthenticated ? (
									<RegisterPage setAuth={setAuth} />
								) : type === "admin" ? (
									<Navigate
										to="/dashboard/admin"
										setAuth={setAuth}
									/>
								) : type === "retailer" ? (
									<Navigate
										to="/dashboard/retailer"
										setAuth={setAuth}
									/>
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>
						<Route
							path="/register/retailer"
							element={
								!isAuthenticated ? (
									<RetailerRegister setAuth={setAuth} />
								) : type === "admin" ? (
									<Navigate
										to="/dashboard/admin"
										setAuth={setAuth}
									/>
								) : type === "retailer" ? (
									<Navigate
										to="/dashboard/retailer"
										setAuth={setAuth}
									/>
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>

						<Route
							exact
							path="/dashboard/admin"
							element={
								isAuthenticated ? (
									<AdminDashboard setAuth={setAuth} />
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>
						<Route
							exact
							path="/dashboard/retailer"
							element={
								isAuthenticated ? (
									<RetailerDashboard setAuth={setAuth} />
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>

						<Route
							exact
							path="/dashboard/admin/approval"
							element={<PendingApprovals />}
						/>
						<Route
							exact
							path="/dashboard/admin/userAccesses"
							element={<AdminHistoryPage />}
						/>
						<Route
							exact
							path="/dashboard/admin/revokeAccesses"
							element={<RevokeAccessPage />}
						/>
						<Route
							exact
							path="/dashboard/admin/viewClients"
							element={<ViewClients />}
						/>
						<Route
							exact
							path="/dashboard/retailer/notifications"
							element={<RetailerNotifications />}
						/>
						<Route
							exact
							path="/dashboard/retailer/notifications/inventoryForm"
							element={<InventoryForm />}
						/>
						<Route
							exact
							path="/dashboard/retailer/inventory"
							element={<InventoryPage />}
						/>
						<Route
							exact
							path="/dashboard/retailer/history"
							element={<HistoryPage />}
						/>
						<Route
							exact
							path="/dashboard/retailer/inbound"
							element={<InboundPage />}
						/>
						<Route
							exact
							path="/dashboard/retailer/outbound"
							element={<OutboundPage />}
						/>
					</Routes>
				</Router>
			</div>
		</Fragment>
	);
}
export default App;
