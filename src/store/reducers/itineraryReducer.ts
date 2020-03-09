import {
	FETCH_ITINERARIES_REQUEST,
	FETCH_ITINERARIES_SUCCESS,
	FETCH_ITINERARIES_FAILURE,
	RESET_ITINERARIES,
} from "../actions/itineraryActions";

const initialItineraryState = {
	loading: false,
	success: null,
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
				success: null,
			};
		case FETCH_ITINERARIES_SUCCESS:
			return {
				loading: false,
				success: true,
				itineraries: action.payload,
			};
		case FETCH_ITINERARIES_FAILURE:
			return {
				loading: false,
				success: false,
				itineraries: [],
				error: action.payload,
			};
		case RESET_ITINERARIES:
			return {
				loading: false,
				success: null,
				itineraries: [],
				error: "",
			};
		default:
			return state;
	}
}
