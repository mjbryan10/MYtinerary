import {
	FETCH_AUTHORS_REQUEST,
	FETCH_AUTHORS_SUCCESS,
	FETCH_AUTHORS_FAILURE,
} from "../actions/authorActions";

const initialAuthorsState = {
	loading: false,
	itineraries: [],
	error: "",
};

export default function itinerariesReducer(
	state: object = initialAuthorsState,
	action: any = {}
) {
	switch (action.type) {
		case FETCH_AUTHORS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_AUTHORS_SUCCESS:
			return {
				loading: false,
				itineraries: action.payload,
			};
		case FETCH_AUTHORS_FAILURE:
			return {
				loading: false,
				itineraries: [],
				error: action.payload,
			};
		default:
			return state;
	}
}
