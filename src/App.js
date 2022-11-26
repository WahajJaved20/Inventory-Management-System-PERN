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
import CustomerRegister from "./auth/customerRegister";
import AdminDashboard from "./dashboards/adminDashboard";
import RetailerDashboard from "./dashboards/retailerDashboard";
import CustomerDashboard from "./dashboards/customerDashboard";
import { Fragment } from "react";
import PendingApprovals from "./options/admin/pendingApprovals";
import UserAccesses from "./options/admin/userAccesses";
import RevokeAccesses from "./options/admin/revokeAccesses";
import ViewClients from "./options/admin/viewClients";
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
								) : type === "customer" ? (
									<Navigate
										to="/dashboard/customer"
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
									<RegisterPage />
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
								) : type === "customer" ? (
									<Navigate
										to="/dashboard/customer"
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
									<RetailerRegister />
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
								) : type === "customer" ? (
									<Navigate
										to="/dashboard/customer"
										setAuth={setAuth}
									/>
								) : (
									<Navigate to="/" setAuth={setAuth} />
								)
							}
						/>
						<Route
							path="/register/customer"
							element={<CustomerRegister setAuth={setAuth} />}
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
							path="/dashboard/customer"
							element={
								isAuthenticated ? (
									<CustomerDashboard setAuth={setAuth} />
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
							element={<UserAccesses />}
						/>
						<Route
							exact
							path="/dashboard/admin/revokeAccesses"
							element={<RevokeAccesses />}
						/>
						<Route
							exact
							path="/dashboard/admin/viewClients"
							element={<ViewClients />}
						/>
					</Routes>
				</Router>
			</div>
		</Fragment>
	);
}
export default App;
