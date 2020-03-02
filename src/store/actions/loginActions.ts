export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function logUserIn(): object {
	return {
		type: USER_LOGIN,
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
	console.log("tokenStatus", "has been called");
	let token = tokenFromStorage();
	console.log("token", token);
	return (dispatch: any) => {
        console.log("token === null");
		if (!token) {
			dispatch(logUserOut());
		} else {
			dispatch(logUserIn());
		}
	};
};

// export const logOutUser = () => {
//     window.localStorage.removeItem("session_token");
//     tokenStatus();
// }