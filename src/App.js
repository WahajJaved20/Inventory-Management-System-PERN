import React from "react";
import { ReactDOM } from "react-dom";
import "./App.css";
import Login from "./auth/login";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./auth/registerScreen";
import CustomerRegister from "./auth/customerRegister";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/register/customer"
					element={<CustomerRegister />}
				/>
			</Routes>
		</div>
	);
}
export default App;
