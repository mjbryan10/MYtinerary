export const FETCH_ITINERARIES_REQUEST = "FETCH_ITINERARIES_REQUEST";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";
export const RESET_ITINERARIES = "RESET_ITINERARIES";

export function fetchItinerariesRequest(): object {
	return {
		type: FETCH_ITINERARIES_REQUEST,
	};
}
export function fetchItinerariesSuccess(itineraries: [object]): object {
	return {
		type: FETCH_ITINERARIES_SUCCESS,
		payload: itineraries,
	};
}
export function fetchItinerariesFailure(error: string): object {
	return {
		type: FETCH_ITINERARIES_FAILURE,
		payload: error,
	};
}
export function resetItineraries() {
	return {
		type: RESET_ITINERARIES,
	};
}

export function fetchCurrentCityItineraries(cityId: string) {
	return (dispatch: any) => {
		dispatch(fetchItinerariesRequest());
		fetch(`http://localhost:5000/itinerariesAPI/${cityId}`) //TODO: NOT YET ROUTED
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					throw res.erorr;
				}
				dispatch(fetchItinerariesSuccess(res));
			})
			.catch(err => dispatch(fetchItinerariesFailure(err.message)));
	};
}
