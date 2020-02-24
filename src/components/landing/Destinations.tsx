import React, { useState, useEffect } from "react";
import CityCard from "../cities/CityCard";
// import Cities from "../../data/cities.json";
import DestinationControls from "./DestinationControls";
import Spinner from "../global/Spinner";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
	createStyles({
		destinationContainer: {
			display: "flex",
			flexFlow: "column nowrap",
			justifyContent: "space-between",
			width: "100%",
			minHeight: "250px",
		},
		cardsContainer: {
			display: "flex",
			flexFlow: "row wrap",
			width: "100%",

			// color: "blue",
		},
	})
);
export default function Destinations() {
	const classes = useStyles();
	//STATE
	const [cities, setCities] = useState<any>([]);
	const [slideLength, setSlideLength] = useState<number>(0);
	const [slideIndex, setSlideIndex] = useState<number>(0);
	const [isFetchingCities, setIsFetchingCities] = useState<boolean>(false);
	const [citiesLoaded, setCitiesLoaded] = useState<boolean>(false);
	const fetchCities = () => {
		setIsFetchingCities(true);
		fetch("http://localhost:5000/cities/all")
			.then(response => response.json())
			.then(result => {
				setIsFetchingCities(false);
				setCities(result);
				setCitiesLoaded(true);
				console.log(cities);
			})
			.catch(e => console.log(e));
	};

	let numPerSlide = 4;
	const calcNumOfSlides = (): number => {
		return Math.ceil(cities.length / numPerSlide);
	};
	let onButtonClick = (direction: string) => {
		// setisLoading(true);
		let index: number = slideIndex;
		if (direction === "right") {
			index = slideIndex === slideLength - 1 ? 0 : index + 1;
		} else if (direction === "left") {
			index = slideIndex === 0 ? slideLength - 1 : index - 1;
		}
		setSlideIndex(index);
		// setisLoading(false);
	};
	const updateState = (): void => {
		// setCities(Cities);
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
	}, []);
	useEffect((): void => {
		updateState();
	});
	//TODO: Build carrasousel with cards
	return (
		<div className={classes.destinationContainer}>
			<h3>Popular MYtineraries</h3>
			{!citiesLoaded ? (
				<Spinner />
			) : (
				<div className={classes.cardsContainer}>
					{console.log(filterByCurrentSlide(cities))}
					{filterByCurrentSlide(cities).map((city: any, index: number) => {
						return <CityCard cityName={city.name} key={index} />;
					})}
				</div>
			)}
			<DestinationControls
				slideLength={slideLength}
				slideIndex={slideIndex}
				onButtonClick={onButtonClick}
			/>
		</div>
	);
}
