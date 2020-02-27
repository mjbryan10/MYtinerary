import "./itineraries.scss";
import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router'
import CityCard from "../cities/CityCard";
import Spinner from "../global/Spinner";
import ItineraryCard from "./ItineraryCard";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	fetchCurrentCity as fetchCurrentCityAction,
	resetCurrentCity as resetCurrentCityAction,
} from "../../store/actions/currentCityActions";
import {
	fetchCurrentCityItineraries as fetchItinerariesAction,
	resetItineraries as resetItinerariesAction,
} from "../../store/actions/itineraryActions";
import { Link } from "react-router-dom";

type CityItinerariesProps = {
	fetchCurrentCity: any;
	city: any;
	cityLoading: boolean;
	fetchItineraries: any;
	itinerariesLoading: boolean;
	itineraries: [any];
	resetItineraries: any;
	resetCurrentCity: any;
};

const CityItineraries: FunctionComponent<CityItinerariesProps> = ({
	fetchCurrentCity,
	city,
	cityLoading,
	fetchItineraries,
	itinerariesLoading,
	itineraries,
	resetItineraries,
	resetCurrentCity,
}) => {
	let pathName: any = useParams();
	let cityName = pathName.cityName;

	useEffect(() => {
		if (!city.length) {
			fetchCurrentCity(cityName);
		}
		fetchItineraries(city._id);
	}, [
		city._id,
		city.length,
		cityName,
		fetchCurrentCity,
		fetchItineraries,
    ]);
    useEffect(() => {
        return () => {
			resetItineraries();
			resetCurrentCity();
		};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
			<Link to="/cities" >Choose another city...</Link> 
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
			resetItineraries: resetItinerariesAction,
			resetCurrentCity: resetCurrentCityAction,
			// fetchAuthors: fetchAuthorsAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CityItineraries);