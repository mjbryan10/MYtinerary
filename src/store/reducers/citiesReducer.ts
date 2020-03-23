import {
	FETCH_CITIES_REQUEST,
	FETCH_CITIES_SUCCESS,
	FETCH_CITIES_ERROR,
} from "../actions/cityActions";

const initialCitiesState = {
	loading: false,
	success: false,
	cities: [],
	error : '',
};

export default function citiesReducer(state: object = initialCitiesState, action: any = {}) {
	switch (action.type) {
		case FETCH_CITIES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_CITIES_SUCCESS:
			return {
				loading: false,
				success: true,
				cities: action.payload,
			};
		case FETCH_CITIES_ERROR:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
