import {clearCurrentUser} from "./userActions"
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const REDIRECT = "REDIRECT";

export function userLoggedIn(token: any): object {
	return {
		type: USER_LOGGED_IN,
		payload: token,
	};
}
export function userLoggedOut(): object {
	return {
		type: USER_LOGGED_OUT,
	};
}
export function redirectToLogIn(): object {
	return {
		type: REDIRECT,
	}
}

export const tokenFromStorage = (): string | null => {
	return window.localStorage.getItem("session_token");
};

export const updateLoginStatus = (): any => {
	let token: any = tokenFromStorage();
	if (token === null) {
		return (dispatch: any) => {
            dispatch(userLoggedOut());
            dispatch(clearCurrentUser());
		};
	} else {
		return (dispatch: any) => {
			dispatch(userLoggedIn(token));
		};
	}
}

export const logUserOut = ():void => {
	window.localStorage.removeItem("session_token");
	updateLoginStatus();
}
