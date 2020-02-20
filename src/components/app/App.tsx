import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Nav from "../nav/Nav";

import Landing from "../landing/Landing";
import Cities from "../cities/Cities";
import NotFound from "../NotFound";
import Footer from "../footer/Footer";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Nav />
				<div className="page-content">
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route path="/cities" component={Cities} />
						<Route component={NotFound} />
					</Switch>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
