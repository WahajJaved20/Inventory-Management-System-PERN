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
function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [type, setType] = useState("");
	const [verify, setVerify] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	async function isAuth() {
		const token = localStorage.getItem("token");
		if (token !== undefined || !token) {
			console.log("trying...");
			const response = await fetch(
				"http://localhost:5000/authentication/verify",
				{
					method: "POST",
					headers: { jwt_token: token },
				}
			);
			const res = await response.json();
			setType(localStorage.getItem("type"));
			setIsAuthenticated(res);
		}
	}
	useEffect(() => {
		if (!verify) {
			if (localStorage.getItem("token") !== undefined) {
				isAuth();
			}
		}
		// if (type === "") {
		// 	const type = localStorage.getItem("type");
		// 	if (type) {
		// 		setType(type);
		// 	}
		// }
	}, [type]);
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
							element={<RegisterPage />}
						/>
						<Route
							path="/register/retailer"
							element={<RetailerRegister setAuth={setAuth} />}
						/>
						<Route
							path="/register/customer"
							element={<CustomerRegister setAuth={setAuth} />}
						/>
						<Route
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
							path="/dashboard/admin/approval"
							element={<PendingApprovals />}
						/>
					</Routes>
				</Router>
			</div>
		</Fragment>
	);
}
export default App;
