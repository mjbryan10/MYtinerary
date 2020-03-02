import { USER_LOGIN, USER_LOGOUT, UPDATE_CURRENT_USER_DETAILS } from "../actions/loginActions";

type IntialLoginState = {
	loggedIn: boolean;
	token: string;
	details: object;
	error: string;
};

const initialLoginState: IntialLoginState = {
	loggedIn: false,
	token: "",
	details: {},
	error: "",
};

export default function loginReducer(
	state: object = initialLoginState,
	action: any = {}
) {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				loggedIn: true,
				token: action.payload,
			};
		case USER_LOGOUT:
			return {
				initialLoginState
			};
		case UPDATE_CURRENT_USER_DETAILS:
			return {
				...state,
				details: action.payload
			} 
		default:
			return state;
	}
}
