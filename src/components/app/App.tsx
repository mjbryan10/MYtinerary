import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

//COMPONENTS
import Nav from "../nav/Nav";
import Landing from "../landing/Landing";
import Cities from "../cities/Cities";
import City from "../itineraries/City";
import NotFound from "../NotFound";
import Footer from "../footer/Footer";

//THEME FOR APP
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#dc2b00",
		},
	},
});

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<ThemeProvider theme={theme}>
					<Nav />
					<div className="page-content">
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route path="/cities" component={Cities} />
							<Route path="/itineraries" component={City} />
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</ThemeProvider>
			</div>
		</BrowserRouter>
	);
}

export default App;
