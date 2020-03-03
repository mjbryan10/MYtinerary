import { USER_LOGIN, USER_LOGOUT } from "../actions/loginActions";

type IntialLoginState = {
	loggedIn: boolean;
	token: string;
	error: string;
};

const initialLoginState: IntialLoginState = {
	loggedIn: false,
	token: "",
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
		default:
			return state;
	}
}
