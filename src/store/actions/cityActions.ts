export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR';

export function fetchCitiesRequest() {
    return {
        type: FETCH_CITIES_REQUEST
    }
}

export function fetchCitiesSuccess(cities: [any]) {
    return {
        type: FETCH_CITIES_SUCCESS,
        payload: cities
    }
}

export function fetchCitiesError(error: string) {
    return {
        type: FETCH_CITIES_ERROR,
        payload: error
    }
}

export const fetchTopCities = () => {
    return (dispatch: any) => {
        dispatch(fetchCitiesRequest());
        fetch('http://localhost:5000/citiesAPI/top')
        .then(res => res.json())
        .then(res => {
            dispatch(fetchCitiesSuccess(res));
            return res.cities;
        })
        .catch(error => {
            dispatch(fetchCitiesError(error.message));
        })
    }
}