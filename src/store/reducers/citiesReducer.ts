import {
	FETCH_CITIES_LOADING,
	FETCH_CITIES_SUCCESS,
	FETCH_CITIES_ERROR,
} from "../actions/cityActions";

const initialState = {
	isLoading: false,
	cities: [],
	error: null,
};

export default function citiesReducer(state: object = initialState, action: any = {}) {
	switch (action.type) {
		case FETCH_CITIES_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case FETCH_CITIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case FETCH_CITIES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};
		default:
			return state;
	}
}

export const getCities = (state: any) => state.cities;
export const getCitiesLoading = (state: any) => state.isLoading;
export const getCitiesError = (state: any) => state.error;
