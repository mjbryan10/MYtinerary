//ACTION NAMES
export const CURRENT_CITY_REQUEST = "CURRENT_CITY_REQUEST";
export const CURRENT_CITY_SUCCESS = "CURRENT_CITY_SUCCESS";
export const CURRENT_CITY_ERROR = "CURRENT_CITY_ERROR";
export const RESET_CURRENT_CITY = "RESET_CURRENT_CITY";

//ACTION BUILDERS

export function currentCityRequest(): object {
	return {
		type: CURRENT_CITY_REQUEST,
	};
}
export function currentCitySuccess(city: object): object {
	return {
		type: CURRENT_CITY_SUCCESS,
		payload: city,
	};
}
export function currentCityError(error: string): object {
	return {
		type: CURRENT_CITY_ERROR,
		payload: error,
	};
}
export function resetCurrentCity() {
	return {
		type: RESET_CURRENT_CITY,
	};
}

export function fetchCurrentCity(cityName: string) {
	return (dispatch: any) => {
		dispatch(currentCityRequest());
		fetch(`http://localhost:5000/cities/${cityName}`)
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					throw res.error;
				}
				dispatch(currentCitySuccess(res));
			})
			.catch(err => dispatch(currentCityError(err.message)));
	};
}
