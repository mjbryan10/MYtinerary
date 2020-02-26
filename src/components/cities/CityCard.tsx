import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchCurrentCity as fetchCurrentCityAction } from '../../store/actions/currentCityActions';
import { bindActionCreators } from "redux";

function CityCard(props: any) {
	const { cityName, fetchCurrentCity } = props;
	const handleClick = (e: any) => {
		// e.preventDefault();
		fetchCurrentCity(cityName);
	}
	return (
		<Link className="city-card fade-in" to={"/itineraries/" + cityName} onClick={handleClick} >
				<div className="city-card-inner">
					<h4>{cityName}</h4>
				</div>
		</Link>
	);
}

const mapStateToProps = (state: any): object => {
	return {
		loading: state.currentCity.loading,
		city: state.currentCity.cities,
		error: state.currentCity.error,
	};
};


const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchCurrentCity: fetchCurrentCityAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CityCard);