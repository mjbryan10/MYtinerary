import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

//COMPONENTS
import Nav from "../nav/Nav";
import Landing from "../landing/Landing";
import Cities from "../cities/Cities";
import CityItineraries from "../itineraries/CityItineraries";
import CreateAccount from "../account/CreateAccount";
import NotFound from "../NotFound";
import Footer from "../footer/Footer";

//THEME FOR APP
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
	spacing: 8,
	palette: {
		primary: {
			main: "#dc2b00",
		},
		secondary: {
			main: "#394e56",
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
							<Route path="/itineraries/:cityName" component={CityItineraries} />
							<Route path="/create" component={CreateAccount} />
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
