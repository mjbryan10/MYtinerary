import "./cities.scss";
import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Spinner from "../global/Spinner";

//REDUX
import { bindActionCreators } from "redux"; //ALT
import { connect } from "react-redux";
import { default as fetchCitiesAction } from "../../store/actions/fetchCities";

const Cities = (props: any) => {
	const { cities, fetchCities, loading } = props;
	const [searchStr, setSearchStr] = useState("");
	useEffect((): void => {
		console.log("useffect did run");
		fetchCities();
	}, []);
	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchStr(e.target.value);
		// props.onChange(e.target.value);
	};
	function filterCities(): any {
		if (searchStr.length) {
			let filtered = [];
			for (const city of cities) {
				if (city.name.toLowerCase().search(searchStr) === 0) {
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
			{loading ? <Spinner /> : null}
			{cities.length ? (
				<div className="cards-container">
					<input
						type="text"
						placeholder="Search for a city.."
						value={searchStr}
						onChange={handleChange}
					/>
					{filterCities().map((city: any, index: number) => (
						<a href={"/" + city.name}>
							<CityCard className="city-card" cityName={city.name} key={index} />
						</a>
					))}
				</div>
			) : null}
		</div>
	);
};
const mapStateToProps = (state: any): object => {
	console.log(state);
	return {
		loading: state.cities.loading,
		cities: state.cities.cities,
		error: state.cities.error,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchCities: fetchCitiesAction,
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
