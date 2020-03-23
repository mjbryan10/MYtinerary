import "./cities.scss";
import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Spinner from "../global/Spinner";
import Search from "../global/Search";

//REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAllCities as fetchAllCitiesAction } from "../../store/actions/cityActions";

const Cities = (props: any) => {
	const { cities, fetchAllCities, loading, token, hasLoaded, loggedIn,  } = props;
	const [searchStr, setSearchStr] = useState("");
	useEffect((): void => {
		if (loggedIn) {
			fetchAllCities(token);
		}
	}, [fetchAllCities, token, loggedIn]);
	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchStr(e.target.value);
	};
	function filterCities(): any {
		if (searchStr.length) {
			let filtered = [];
			for (const city of cities) {
				if (city.name.toLowerCase().search(searchStr.toLowerCase()) === 0) {
					//Change to includes if want less strict search
					filtered.push(city);
				}
			}
			return filtered;
		}
		return cities;
	} 
	return (
		<div className="cities-container">
			<h1>Cities</h1>
			<Search className="city-search" value={searchStr} onChange={handleChange} />
			{loading ? <Spinner /> : null}
			{hasLoaded ? (
				<div className="cards-container">
					{filterCities().map((city: any, index: number) => (
						<CityCard
							cityName={city.name}
							cityImg={city.img}
							imgCredit={city.img_credit}
							key={index}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};
const mapStateToProps = (state: any): object => {
	return {
		//Cities
		loading: state.cities.loading,
		hasLoaded: state.cities.success,
		cities: state.cities.cities,
		error: state.cities.error,
		//login
		loginPending: state.login.pending,
		token: state.login.token,
		loggedIn: state.login.loggedIn
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchAllCities: fetchAllCitiesAction,
		},
		dispatch
	);
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
