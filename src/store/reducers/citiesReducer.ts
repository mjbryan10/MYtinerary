import {
	FETCH_CITIES_REQUEST,
	FETCH_CITIES_SUCCESS,
	FETCH_CITIES_ERROR,
} from "../actions/cityActions";

const initialCitiesState = {
	loading: false,
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
				cities: action.payload,
			};
		case FETCH_CITIES_ERROR:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}


//DEPRICATED
// export const getCities = (state: any) => state.cities;
// export const getCitiesRequest = (state: any) => state.loading;
// export const getCitiesError = (state: any) => state.error;
