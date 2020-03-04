import { USER_LOGGED_IN, USER_LOGGED_OUT, REDIRECT } from "../actions/loginActions";

type IntialLoginState = {
	loggedIn: boolean;
	token: string;
	error: string;
	redirect: boolean;
};

const initialLoginState: IntialLoginState = {
	loggedIn: false,
	token: "",
	error: "",
	redirect: false,
};

export default function loginReducer(
	state: object = initialLoginState,
	action: any = {}
) {
	switch (action.type) {
		case USER_LOGGED_IN:
			return {
				...state,
				loggedIn: true,
				redirect: false,
				token: action.payload,
			};
		case USER_LOGGED_OUT:
			return {
				...state,
				loggedIn: false,
				token: "",
				redirect: true,
			};
		case REDIRECT:
			return {
				...state,
				redirect: true,
			};
		default:
			return state;
	}
}
