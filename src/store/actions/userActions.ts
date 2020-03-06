export const USER_PENDING = "USER_PENDING";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";
export const USER_EXPIRED = "USER_EXPIRED";
// export const ADD_FAV = "ADD_FAV";
// export const DEL_FAV = "DEL_FAV";
// export const CLEAR_FAV = "CLEAR_FAV";

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
	};
}
export function expiredUser(payload: any): object {
	return {
		type: USER_EXPIRED,
		payload,
	};
}

// export function updateFav(action: string, payload: any): object {
// 	if (action === "add") {
// 		return {
// 			type: ADD_FAV,
// 			payload,
// 		};
// 	} else if (action === "del") {
// 		return {
// 			type: DEL_FAV,
// 			payload,
// 		};
// 	}
// 	return {
// 		type: CLEAR_FAV,
// 		payload: [],
// 	};
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
				if (res.error) {
					throw res.msg;
				}
				if (res.expired) {
					dispatch(expiredUser(res.msg));
				} else {
					dispatch(fetchUserSuccess(res));
				}
				return res;
			})
			.catch(error => {
				dispatch(fetchUserFailure(error.msg));
			});
	};
};

// export const updateFavourites = (action: string, itinId: string, token: string) => {
// 	return (dispatch: any) => {
// 		fetch(`http://localhost:5000/usersAPI/${action}/fav`, {
// 			method: "put",
// 			headers: {
// 				Accept: "application/json, text/plain, */*",
// 				"Content-Type": "application/json",
// 				"x-api-key": token,
// 			},
// 			body: JSON.stringify({ fav: itinId }),
// 		})
// 			.then((res: any) => res.json())
// 			.then((res: any) => {
// 				if (res.success) {
// 					dispatch(updateFav(action, itinId));
// 				}
// 			});
// 	};
// };
