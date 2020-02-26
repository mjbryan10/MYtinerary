import "./itineraries.scss";
import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import CityCard from "../cities/CityCard";
import Spinner from "../global/Spinner";
import ItineraryCard from "./ItineraryCard";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCurrentCity as fetchCurrentCityAction } from "../../store/actions/currentCityActions";
import { fetchCurrentCityItineraries as fetchItinerariesAction } from "../../store/actions/itineraryActions";

type CityItinerariesProps = {
	fetchCurrentCity: any;
	city: any;
	cityLoading: boolean;
	fetchItineraries: any;
	itinerariesLoading: boolean;
	itineraries: [any];
};

const CityItineraries: FunctionComponent<CityItinerariesProps> = ({
	fetchCurrentCity,
	city,
	cityLoading,
	fetchItineraries,
	itinerariesLoading,
	itineraries,
}) => {
	let pathName = window.location.pathname;
	let cityName = pathName.split("/")[2];
	useEffect((): void => {
		if (!city.length) {
			fetchCurrentCity(cityName);
		}
		fetchItineraries(city._id);
	}, [city._id, city.length, cityName, fetchCurrentCity, fetchItineraries]);
	return (
		<div>
			{cityLoading ? <Spinner /> : <CityCard cityName={city.name} />}
			{itinerariesLoading ? (
				<Spinner />
			) : (
				itineraries.map((itinerary: any, index: number) => {
					return <ItineraryCard key={index} itinerary={itinerary} />;
				})
			)}
		</div>
	);
};

const mapStateToProps = (state: any): object => {
	return {
		cityLoading: state.currentCity.loading,
		city: state.currentCity.city,
		itinerariesLoading: state.itineraries.loading,
		itineraries: state.itineraries.itineraries,
	};
};

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchCurrentCity: fetchCurrentCityAction,
			fetchItineraries: fetchItinerariesAction,
			// fetchAuthors: fetchAuthorsAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CityItineraries);
