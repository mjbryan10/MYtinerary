import {
	CURRENT_CITY_REQUEST,
	CURRENT_CITY_SUCCESS,
	CURRENT_CITY_ERROR,
} from "../actions/currentCityActions";

const initialCurrentCityState = {
	loading: false,
	city: {},
	error : '',
};

export default function citiesReducer(state: object = initialCurrentCityState, action: any = {}) {
	switch (action.type) {
		case CURRENT_CITY_REQUEST:
			return {
				...state,
				loading: false,
			};
		case CURRENT_CITY_SUCCESS:
			return {
				loading: false,
				city: action.payload,
			};
		case CURRENT_CITY_ERROR:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}