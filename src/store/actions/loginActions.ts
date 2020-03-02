export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const UPDATE_CURRENT_USER_DETAILS = "UPDATE_CURRENT_USER_DETAILS";

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
export function updateCurrentuserDetails(payload: object): object {
	console.log("functionupdateCurrentuserDetails -> payload", payload);
	return {
		type: UPDATE_CURRENT_USER_DETAILS,
		payload,
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
		};
	} else {
		return (dispatch: any) => {
			dispatch(logUserIn(token));
		};
	}
	// return (dispatch: any) => {
	// 	if (!token) {
	// 		dispatch(logUserOut());
	// 	} else {
	// 		dispatch(logUserIn(token));
	// 	}
	// };
};

export const updateLoginState = (token: string): any => {
	console.log(token);
};

