import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Landing from "../landing/Landing";
import Cities from '../cities/Cities';
import NotFound from '../NotFound'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/cities" component={Cities} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
