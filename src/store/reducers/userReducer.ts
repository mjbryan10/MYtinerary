import {
	USER_PENDING,
	USER_SUCCESS,
	USER_ERROR,
	CLEAR_CURRENT_USER,
	// ADD_FAV,
	// DEL_FAV,
	// CLEAR_FAV,
} from "../actions/userActions";

type IntialUserState = {
	pending: boolean;
	success: boolean;
	details: any;
	error: string;
};

const intialUserState: IntialUserState = {
	pending: false,
	success: false,
	details: {
		// name:"",
		// img: "",
		// favourities: [],
	},
	error: "",
};

export default function loginReducer(state: any = intialUserState, action: any = {}) {
	switch (action.type) {
		case USER_PENDING:
			return {
				...state,
				pending: true,
			};
		case USER_SUCCESS:
			return {
				...state,
				pending: false,
				success: true,
				details: action.payload,
			};
		case USER_ERROR:
			return {
				...state,
				success: false,
				details: {},
				error: action.payload,
			};
		case CLEAR_CURRENT_USER:
			return {
				success: false,
				details: {},
				error: "",
			};
		// case ADD_FAV:
		// 	console.log("payload: ", action.payload)
		// 	return {
		// 		...state,
		// 		details: {...state.details, favourites: state.details.favourites.push(action.payload)}
		// 	}
		// case DEL_FAV:
		// 	let index = state.details.favourites.indexOf(action.payload)
      //    console.log("loginReducer -> state.details.favourites", state.details.favourites);
		// 	console.log("index:", index, "payload: ", action.payload)
		// 	let newArray = state.details.favourites.splice(index, 1);
      //    console.log("loginReducer -> state.details.favourites", state.details.favourites);
		// 	return {
		// 		...state,
		// 		details: {...state.details, favourites: newArray},
		// 	}
		// case CLEAR_FAV: {
		// 	return {
		// 		...state,
		// 		details: {favourites: action.payload}
		// 	}
		// }
		default:
			return state;
	}
}
