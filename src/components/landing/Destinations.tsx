import React, { useState, useEffect } from "react";
import CityCard from "../cities/CityCard";
import DestinationControls from "./DestinationControls";
import Spinner from "../global/Spinner";

//REDUX
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {fetchTopCities as fetchTopCitiesAction} from '../../store/actions/cityActions'
// import { default as fetchCitiesAction } from "../../store/actions/fetchCities";

//STYLES
import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
	createStyles({
		destinationContainer: {
			display: "flex",
			flexFlow: "column nowrap",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			minHeight: "250px",
			"& h3": {
				marginRight: "auto",
			},
		},
		cardsContainer: {
			display: "flex",
			flexFlow: "row wrap",
			width: "100%",
		},
	})
);
function Destinations(props: any) {
	const { fetchCities, loading, cities } = props;
	const classes = useStyles();
	//STATE
	const [slideLength, setSlideLength] = useState<number>(0);
	const [slideIndex, setSlideIndex] = useState<number>(0);
	// const [numPerSlide, setNumPerSlide] = useState(4)
	let numPerSlide = 4; //Change this to set how many cities appear per slide
	// let maxCards = 12; //Change this to set array length

	//FUNCTIONS
	const calcNumOfSlides = (): number => {
		return Math.ceil(cities.length / numPerSlide);
	};
	let onButtonClick = (direction: string) => {
		let index: number = slideIndex;
		if (direction === "right") {
			index = slideIndex === slideLength - 1 ? 0 : index + 1;
		} else if (direction === "left") {
			index = slideIndex === 0 ? slideLength - 1 : index - 1;
		}
		setSlideIndex(index);
	};
	const onSpanClick = (spanIndex: number):void => {
		setSlideIndex(spanIndex);
	}
	const updateState = (): void => {
		setSlideLength(calcNumOfSlides());
	};
	function filterByCurrentSlide(array: [any]) {
		let filteredArray = [];
		let index: number = numPerSlide * slideIndex;
		let length: number =
			index + numPerSlide >= array.length ? array.length : index + numPerSlide;
		for (let i = index; i < length; i++) {
			const element = array[i];
			filteredArray.push(element);
		}
		return filteredArray;
	}
	useEffect((): void => {
		fetchCities();
	}, [fetchCities]);
	useEffect((): void => {
		updateState();
	});
	return (
		<div className={classes.destinationContainer}>
			<h3>Popular MYtineraries</h3>
			{loading ? (
				<Spinner />
			) : (
				<div className={classes.cardsContainer}>
					{filterByCurrentSlide(cities).map((city: any, index: number) => {
						return <CityCard cityName={city.name} cityImg={city.img} imgCredit={city.img_credit} key={index} />;
					})}
				</div>
			)}
			<DestinationControls
				slideLength={slideLength}
				slideIndex={slideIndex}
				onButtonClick={onButtonClick}
				onSpanClick={onSpanClick}
			/>
		</div>
	);
}

const mapStateToProps = (state: any): object => {
	return {
		loading: state.cities.loading,
		cities: state.cities.cities,
		error: state.cities.error,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchCities: fetchTopCitiesAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Destinations);
