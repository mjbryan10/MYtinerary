import {fetchCitiesLoading, fetchCitiesSuccess, fetchCitiesError} from './cityActions';

function fetchCities() {
    return (dispatch: any) => {
        dispatch(fetchCitiesLoading());
        fetch('http://localhost:5000/cities/all')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCitiesSuccess(res.cities));
            return res.cities;
        })
        .catch(error => {
            dispatch(fetchCitiesError(error));
        })
    }
}

export default fetchCities;