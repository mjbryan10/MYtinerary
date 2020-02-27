import {fetchCitiesRequest, fetchCitiesSuccess, fetchCitiesError} from './cityActions';

const fetchCities = () => {
    return (dispatch: any) => {
        dispatch(fetchCitiesRequest());
        fetch('http://localhost:5000/citiesAPI/all')
        .then(res => res.json())
        .then(res => {
            // if(res.error) {
            //     throw(res.error);
            // }
            dispatch(fetchCitiesSuccess(res));
            return res.cities;//UNSURE: Does this need to return?
        })
        .catch(error => {
            dispatch(fetchCitiesError(error.message));
        })
    }
}

export default fetchCities;