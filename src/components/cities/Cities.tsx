import "./cities.scss";
import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Spinner from "../global/Spinner";

//REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { loadCities } from "../../store/actions/cityActions";
import fetchCitiesAction from "../../store/actions/fetchCities";

const Cities = (props: any) => {
	// const { test } = props;
	// console.log("TCL: Cities -> test", test);

	const [searchStr, setSearchStr] = useState("");
	// const [hasLoaded, setHasLoaded] = useState(false);
	// const [isFetchingCities, setIsFetchingCities] = useState<boolean>(false);
	// const [cities, setCities] = useState<any>({});
	// const fetchCities = () => {
	// 	setIsFetchingCities(true);
	// 	setHasLoaded(false);
	// 	fetch("http://localhost:5000/cities/all")
	// 		.then(response => response.json())
	// 		.then(result => {
	// 			setCities(result);
	// 			setIsFetchingCities(false);
	// 			setHasLoaded(true);
	// 		})
	// 		.catch(err => console.log(err));
	// };
	const { cities, fetchCities, isFetchingCities } = props;
	useEffect((): void => {
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
			{isFetchingCities ? <Spinner /> : null}
			{/* {hasLoaded ? (
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
			) : null} */}
		</div>
	);
};
const mapStateToProps = (state: any): object => {
	console.log(state);
	return {
		cities: state.citiesReducer.cities,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchCities: fetchCitiesAction,
		},
		dispatch
	);
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
