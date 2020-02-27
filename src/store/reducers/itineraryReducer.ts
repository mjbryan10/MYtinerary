import {
	FETCH_ITINERARIES_REQUEST,
	FETCH_ITINERARIES_SUCCESS,
	FETCH_ITINERARIES_FAILURE,
	RESET_ITINERARIES,
} from "../actions/itineraryActions";

const initialItineraryState = {
	loading: false,
	itineraries: [],
	error: "",
};

export default function itinerariesReducer(
	state: object = initialItineraryState,
	action: any = {}
) {
	switch (action.type) {
		case FETCH_ITINERARIES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_ITINERARIES_SUCCESS:
			return {
				loading: false,
				itineraries: action.payload,
			};
		case FETCH_ITINERARIES_FAILURE:
			return {
				loading: false,
				itineraries: [],
				error: action.payload,
			};
		case RESET_ITINERARIES:
			return {
				loading: false,
				itineraries: [],
				error: "",
			};
		default:
			return state;
	}
}
