import "./cities.scss";
import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Spinner from "../global/Spinner";
import Search from "../global/Search";

//REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAllCities as fetchAllCitiesAction } from "../../store/actions/cityActions";
import { Redirect } from "react-router-dom";
// import { default as fetchAllCitiesAction } from "../../store/actions/fetchAllCities";

const Cities = (props: any) => {
	const { cities, fetchAllCities, loading, token, hasLoaded, redirect } = props;
	const [searchStr, setSearchStr] = useState("");
	useEffect((): void => {
		//Should be able to check token here
		fetchAllCities(token);
	}, [fetchAllCities, token]);
	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchStr(e.target.value);
		// props.onChange(e.target.value);
	};
	function filterCities(): any {
		if (searchStr.length) {
			let filtered = [];
			for (const city of cities) {
				if (city.name.toLowerCase().search(searchStr.toLowerCase()) === 0) {
					//can change to to includes on preference
					filtered.push(city);
				}
			}
			return filtered;
		}
		return cities;
	} 
	if (redirect) {
		return <Redirect to='/login'/>;
	}
	return (
		<div className="cities-container">
			<h1>Cities</h1>
			<Search className="city-search" value={searchStr} onChange={handleChange} />
			{loading ? <Spinner /> : null}
			{hasLoaded ? (
				<div className="cards-container">
					{/* <input
						type="text"
						placeholder="Search for a city.."
						value={searchStr}
						onChange={handleChange}
					/> */}
					{filterCities().map((city: any, index: number) => (
						<CityCard
							// className="city-card"
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
		loading: state.cities.loading,
		hasLoaded: state.cities.success,
		cities: state.cities.cities,
		error: state.cities.error,
		token: state.login.token,
		redirect: state.login.redirect,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchAllCities: fetchAllCitiesAction,
		},
		dispatch
	);
//ALT
// const mapDispatchToProps = (dispatch: any): object => {
// 	return {
// 		fetchCities: () => dispatch(fetchCitiesAction()),
// 	};
// };
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
