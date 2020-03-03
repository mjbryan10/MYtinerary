import {
	USER_PENDING,
	USER_SUCCESS,
	USER_ERROR,
	CLEAR_CURRENT_USER,
} from "../actions/userActions";

type IntialUserState = {
	pending: boolean;
	details: object;
	error: string;
};

const intialUserState: IntialUserState = {
	pending: false,
	details: {},
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
				details: action.payload,
			};
		case USER_ERROR:
			return {
				...state,
				details: {},
				error: action.payload,
			};
		case CLEAR_CURRENT_USER:
			return {
				intialUserState,
			};
		default:
			return state;
	}
}
