import { USER_LOGIN, USER_LOGOUT } from "../actions/loginActions";

const initialLoginState = {
	loggedIn: false,
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
			};
		case USER_LOGOUT:
			return {
				...state,
				loggedIn: false,
			};
		default:
			return state;
	}
}
