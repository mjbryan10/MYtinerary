//ACTION NAMES
export const CURRENT_CITY_REQUEST = "FETCH_CITIES_REQUEST";
export const CURRENT_CITY_SUCCESS = "FETCH_CITIES_SUCCESS";
export const CURRENT_CITY_ERROR = "FETCH_CITIES_ERROR";

//ACTION BUILDERS

export function currentCityRequest(): object {
	return {
		type: CURRENT_CITY_REQUEST,
	};
}
export function currentCitySuccess(city: object): object {
	return {
		type: CURRENT_CITY_REQUEST,
		payload: city,
	};
}
export function currentCityError(error: string): object {
	return {
		type: CURRENT_CITY_REQUEST,
		payload: error,
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
			.catch(err => dispatch(currentCityError(err)));
	};
}
