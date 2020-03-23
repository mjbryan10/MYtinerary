import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

//COMPONENTS
import Nav from "../nav/Nav";
import Landing from "../landing/Landing";
import Cities from "../cities/Cities";
import CityItineraries from "../itineraries/CityItineraries";
import Favourites from "../favourites/Favourites";
import CreateAccount from "../account/CreateAccount";
import LoginPage from "../account/LoginPage";
import NotFound from "../NotFound";
import Footer from "../footer/Footer";

//REDUX:
import { connect } from "react-redux";
import { updateLoginStatus } from "../../store/actions/loginActions";
import { bindActionCreators } from "redux";

//THEME FOR APP
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import { userLoggedIn } from "../../store/actions/loginActions";
const theme = createMuiTheme({
	spacing: 8,
	palette: {
		primary: {
			//Dont forget to change on variables.scss also
			// main: "#4a90ff", // Blue
			// main: "#394e56", //Grey
			main: "#dc2b00", // Red
		},
		secondary: {
			main: "#394e56", //Dark grey
			// main: "#dc2b00", // Red
		},
	},
});
function App() {
	React.useEffect(() => {
		updateLoginStatus();
	});
	return (
		<HashRouter basename="/">
			<div className="App">
				<ThemeProvider theme={theme}>
					<Nav />
					<div className="page-content">
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/MYtinerary" component={Landing} />
							<Route path="/cities" component={Cities} />
							<Route path="/itineraries/:cityName" component={CityItineraries} />
							<Route path="/favourites" component={Favourites} />
							<Route path="/create" component={CreateAccount} />
							<Route path="/login" component={LoginPage} />
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
				</ThemeProvider>
			</div>
		</HashRouter>
	);
}
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			updateLoginStatus,
		},
		dispatch
	);
export default connect(mapDispatchToProps)(App);
