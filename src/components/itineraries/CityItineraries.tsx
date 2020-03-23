import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
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

//STYLES
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
			maxWidth: 800,
         margin: "0 auto",
      },
   })
);

//TYPES
type CityItinerariesProps = {
   fetchCurrentCity: any;
	city: any;
	error: string;
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
	error,
   cityLoading,
   fetchItineraries,
   itinerariesLoading,
   itineraries,
   resetItineraries,
   resetCurrentCity,
}) => {
   const classes = useStyles();
   let pathName: any = useParams();
   let cityName = pathName.cityName;

   useEffect(() => {
      if (!city.length && !city.error) {
         fetchCurrentCity(cityName);
		}
		if(!city.error) {
			fetchItineraries(city._id);
		}
   }, [city._id, city.error, city.length, cityName, fetchCurrentCity, fetchItineraries]);
   useEffect(() => {
      return () => {
         resetItineraries();
         resetCurrentCity();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className={classes.root}>
         {cityLoading || itinerariesLoading ? (
            <Spinner />
         ) : city.error ? <h2>Sorry, it appears we are unable to find the city you were looking for.</h2> : (
            <div className="fade-in">
               <CityCard
                  style={{ display: "block" }}
                  cityName={city.name}
                  cityImg={city.img}
                  imgCredit={city.img_credit}
               />
               {itineraries.map((itinerary: any) => {
                  return <ItineraryCard key={itinerary._id} itinerary={itinerary} />;
               })}
            </div>
         )}
         <Link to="/cities">Choose another city...</Link>
      </div>
   );
};

const mapStateToProps = (state: any): object => {
   return {
      cityLoading: state.currentCity.loading,
		city: state.currentCity.city,
		error: state.currentCity.error,
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
      },
      dispatch
   );

export default connect(mapStateToProps, mapDispatchToProps)(CityItineraries);
