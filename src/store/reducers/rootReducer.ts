import { combineReducers } from "redux";
//IMPORTED REDUCERS:
import citiesReducer from "./citiesReducer";
import currentCityReducer from "./currentCityReducer";
import itineraryReducer from "./itineraryReducer";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
	cities: citiesReducer,
	currentCity: currentCityReducer,
	itineraries: itineraryReducer,
	login: loginReducer,
	currentUser: userReducer,
});
export default rootReducer;
