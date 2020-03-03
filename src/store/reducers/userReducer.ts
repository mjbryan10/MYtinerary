import {
	USER_PENDING,
	USER_SUCCESS,
	USER_ERROR,
	CLEAR_CURRENT_USER,
	USER_EXPIRED,
} from "../actions/userActions";

type IntialUserState = {
	pending: boolean;
	success: boolean;
	details: object;
	expired: boolean;
	error: string;
};

const intialUserState: IntialUserState = {
	pending: false,
	success: false,
	details: {},
	expired: false,
	error: "",
};

export default function loginReducer(state: object = intialUserState, action: any = {}) {
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
				intialUserState,
			};
		case USER_EXPIRED:
			return {
				...state,
				success: false,
				details: {},
				expired: true,
				error: action.payload,
			};
		default:
			return state;
	}
}
