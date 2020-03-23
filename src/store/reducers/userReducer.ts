import {
	USER_PENDING,
	USER_SUCCESS,
	USER_ERROR,
	CLEAR_CURRENT_USER,
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
		default:
			return state;
	}
}
