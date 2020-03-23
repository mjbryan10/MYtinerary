// import { fetchCitiesRequest } from "./cityActions";

export const FETCH_ITINERARIES_REQUEST = "FETCH_ITINERARIES_REQUEST";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";
export const FETCH_ITINERARIES_FAILURE = "FETCH_ITINERARIES_FAILURE";
export const RESET_ITINERARIES = "RESET_ITINERARIES";

export function fetchItinerariesRequest(): object {
	return {
		type: FETCH_ITINERARIES_REQUEST,
	};
}
export function fetchItinerariesSuccess(itineraries: any): object {
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
		fetch(`https://my-itinerary-demo.herokuapp.com/itinerariesAPI/city/${cityId}`) //TODO: NOT YET ROUTED
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

async function fetchItinerarybyId(itinId: string, onlyOnce = true) {
	return await fetch(`https://my-itinerary-demo.herokuapp.com/itinerariesAPI/itinerary/${itinId}`) //TODO: NOT YET ROUTED
		.then(res => res.json())
		.then(res => {
			console.log(res);
			
			if (res.error) {
				throw res.erorr;
			}
			return res.itinerary
		});
	// .catch(err => dispatch(fetchItinerariesFailure(err.message)));
}

export function fetchItinerariesById(itinId: [string]) {
	if (Array.isArray(itinId)) {
		return async (dispatch: any) => {
			dispatch(fetchItinerariesRequest());

			let results = await Promise.all(
				itinId.map((id: any) => {
					return fetchItinerarybyId(id, false);
				})
			).catch((err: any) => console.error(err));
			console.log("fetchItinerariesById -> results", results);
			dispatch(fetchItinerariesSuccess(results));
			//
		};
	}
}
