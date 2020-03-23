//Depreciation warning, to be replaced by fetchAllCities in cityActions
import {fetchCitiesRequest, fetchCitiesSuccess, fetchCitiesError} from './cityActions';

const fetchCities = () => {
    return (dispatch: any) => {
        dispatch(fetchCitiesRequest());
        fetch('https://my-itinerary-demo.herokuapp.com/citiesAPI/all')
        .then(res => res.json())
        .then(res => {
            dispatch(fetchCitiesSuccess(res));
        })
        .catch(error => {
            dispatch(fetchCitiesError(error.message));
        })
    }
}

export default fetchCities;