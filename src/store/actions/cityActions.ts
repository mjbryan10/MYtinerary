export const FETCH_CITIES_LOADING = 'FETCH_CITIES_LOADING';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_ERROR = 'FETCH_CITIES_ERROR';

export function fetchCitiesLoading() {
    return {
        type: FETCH_CITIES_LOADING
    }
}

export function fetchCitiesSuccess(cities: any) {
    return {
        type: FETCH_CITIES_SUCCESS,
        cities: cities
    }
}

export function fetchCitiesError(error: any) {
    return {
        type: FETCH_CITIES_ERROR,
        error: error
    }
}



