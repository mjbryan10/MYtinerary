import {clearCurrentUser} from "./userActions"
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function logUserIn(token: any): object {
	return {
		type: USER_LOGIN,
		payload: token,
	};
}
export function logUserOut(): object {
	return {
		type: USER_LOGOUT,
	};
}

export const tokenFromStorage = (): string | null => {
	return window.localStorage.getItem("session_token");
};

export const tokenStatus = (): any => {
	let token: any = tokenFromStorage();
	if (token === null) {
		return (dispatch: any) => {
            dispatch(logUserOut());
            dispatch(clearCurrentUser());
		};
	} else {
		return (dispatch: any) => {
			dispatch(logUserIn(token));
		};
	}
}
