// const initState: object = {
// 	test: [{name: "testName", country: "testastan"}],
// };

// const rootReducer = (state: object = initState, action: any) => {
// 	return state;
// };
// export default rootReducer;

import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import currentCityReducer from "./currentCityReducer";
const rootReducer = combineReducers({cities: citiesReducer, currentCity: currentCityReducer});
export default rootReducer;