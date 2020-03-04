import { logUserOut, redirectToLogIn } from './loginActions'
export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_ERROR = "FETCH_CITIES_ERROR";

export function fetchCitiesRequest() {
	return {
		type: FETCH_CITIES_REQUEST,
	};
}

export function fetchCitiesSuccess(cities: [any]) {
	return {
		type: FETCH_CITIES_SUCCESS,
		payload: cities,
	};
}

export function fetchCitiesError(error: string) {
	return {
		type: FETCH_CITIES_ERROR,
		payload: error,
	};
}

export const fetchTopCities = () => {
	return (dispatch: any) => {
		dispatch(fetchCitiesRequest());
		fetch("http://localhost:5000/citiesAPI/top")
			.then(res => res.json())
			.then(res => {
				dispatch(fetchCitiesSuccess(res));
				return res.cities;
			})
			.catch(error => {
				dispatch(fetchCitiesError(error.message));
			});
	};
};

export const fetchAllCities = (token: string) => {
	return (dispatch: any) => {
		dispatch(fetchCitiesRequest());
		fetch("http://localhost:5000/citiesAPI/all", {
			method: "get",
			headers: {
				"Content-type": "application/x-www-form-urlencoded",
				// Accept: "application/json, text/plain, */*",
				// "Content-Type": "application/json",
				"x-api-key": token,
			},
			// body: JSON.stringify({ token })
		})
			.then(res => {
                if (res.status === 200) return res.json();
                logUserOut();
                dispatch(redirectToLogIn());
				// window.location.replace("/login");
				//change to react router version
			})
			.then(res => {
				// if(res.error) {
				//     dispatch(fetchCitiesError(res.error));
				//     throw(res.error);
				// }
				dispatch(fetchCitiesSuccess(res));
				return res.cities; 
			})
			.catch(error => {
				dispatch(fetchCitiesError(error.message));
			});
	};
};
