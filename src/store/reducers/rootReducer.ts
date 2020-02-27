// const initState: object = {
// 	test: [{name: "testName", country: "testastan"}],
// };

// const rootReducer = (state: object = initState, action: any) => {
// 	return state;
// };
// export default rootReducer;

import { combineReducers } from "redux";
//IMPORTED REDUCERS:
import citiesReducer from "./citiesReducer";
import currentCityReducer from "./currentCityReducer";
import itineraryReducer from "./itineraryReducer";

const rootReducer = combineReducers({
	cities: citiesReducer,
	currentCity: currentCityReducer,
	itineraries: itineraryReducer,
});
export default rootReducer;
