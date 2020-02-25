import React from 'react';
import CityCard from '../cities/CityCard';
import "./itineraries.scss"

import { connect } from "react-redux";

function City() {
    return (
        <div>
            <CityCard cityName="TEST NAME" />
        </div>
    )
}

export default City


