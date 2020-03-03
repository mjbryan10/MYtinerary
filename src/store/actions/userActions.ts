export const USER_PENDING = "USER_PENDING";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";

export function fetchUserPending(): object {
	return {
		type: USER_PENDING,
	};
}
export function fetchUserSuccess(payload: any): object {
	return {
		type: USER_SUCCESS,
		payload,
	};
}
export function fetchUserFailure(payload: any): object {
	return {
		type: USER_ERROR,
		payload,
	};
}
export function clearCurrentUser(): object {
    return {
        type: CLEAR_CURRENT_USER,
    }
}
// export const fetchCurrentUser = async (token: string) => {
// 	console.log("getCurrentUserDetails -> getCurrentUserDetails");
// 	fetch("http://localhost:5000/usersAPI/user", {
// 		method: "post",
// 		headers: {
// 			Accept: "application/json, text/plain, */*",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ token }),
// 	})
// 		.then(resonse => resonse.json())
// 		.then(result => {
// 			return (dispatch: any) => dispatch(updateCurrentuserDetails(result));
// 		})
// 		.catch(err => console.error(err));
// };

// export const logOutUser = () => {
//     window.localStorage.removeItem("session_token");
//     tokenStatus();
// }

export const fetchCurrentUser = (token: string) => {
	return (dispatch: any) => {
		dispatch(fetchUserPending());
		fetch("http://localhost:5000/usersAPI/user", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token }),
		})
			.then(res => res.json())
			.then(res => {
				if(res.error) {
				    throw(res.msg);
				}
				dispatch(fetchUserSuccess(res));
				return res;
			})
			.catch(error => {
				dispatch(fetchUserFailure(error.msg));
			});
	};
};
