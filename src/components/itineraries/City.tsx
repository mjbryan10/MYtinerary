import "./itineraries.scss"
import React from 'react';
import CityCard from '../cities/CityCard';
import Spinner from '../global/Spinner';

import { connect } from "react-redux";

function City(props: any) {
    const { city, cityLoading } = props;
    return (
        <div>
            {cityLoading ? <Spinner /> : <CityCard cityName={city.name} />}
            
        </div>
    )
}

const mapStateToProps = (state: any): object => {
    return {
        loading: state.currentCity.loading,
        city: state.currentCity.city
    }
}


export default connect(mapStateToProps)(City)


