import React from "react";
import "./App.css";
import Login from "./auth/login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./auth/registerScreen";
import RetailerRegister from "./auth/retailerRegister";
import CustomerRegister from "./auth/customerRegister";
function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route
						path="/register/retailer"
						element={<RetailerRegister />}
					/>
					<Route
						path="/register/customer"
						element={<CustomerRegister />}
					/>
				</Routes>
			</Router>
		</div>
	);
}
export default App;
