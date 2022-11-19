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
import { Fragment } from "react";
function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [type, setType] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	useEffect(() => {
		setType(localStorage.getItem("type"));
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
									<Navigate to="/dashboard/admin" />
								) : (
									<Login />
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
							element={
								!isAuthenticated ? (
									<RetailerRegister setAuth={setAuth} />
								) : (
									<Navigate to="/dashboard/admin" />
								)
							}
						/>
						<Route
							path="/register/customer"
							element={<CustomerRegister />}
						/>
						<Route
							path="/dashboard/admin"
							element={
								isAuthenticated ? (
									<AdminDashboard setAuth={setAuth} />
								) : (
									<Navigate to="/" />
								)
							}
						/>
					</Routes>
				</Router>
			</div>
		</Fragment>
	);
}
export default App;
