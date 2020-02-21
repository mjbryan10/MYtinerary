import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Cities from "../../data/cities.json";
import DestinationControls from "./DestinationControls";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
	createStyles({
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
	const [cities, setCities] = useState<any>([]);
	const [slideLength, setSlideLength] = useState<number>(0);
	const [slideIndex, setSlideIndex] = useState<number>(0);
	let numPerSlide = 4;
	const calcNumOfSlides = (): number => {
		return Math.ceil(cities.length / numPerSlide);
	};
	let onButtonClick = (direction: string) => {
		let index = slideIndex;
		if (direction === "right") {
			index = (slideIndex === slideLength - 1) ? 0 : index + 1;
		} else if (direction === "left") {
			index = (slideIndex === 0) ? slideLength - 1 : index - 1;
		}
		setSlideIndex(index);
	};
	const updateState = (): void => {
		setCities(Cities);
		setSlideLength(calcNumOfSlides());
	}
	function filterByCurrentSlide(array: [any]) {
		let filteredArray = [];
		let index = numPerSlide * slideIndex;
		for (let i = index; i < index + numPerSlide; i++) {
			const element = array[i];
			filteredArray.push(element)
		}
		return filteredArray;
	}
	useEffect((): void => {
		updateState();
	});
	//TODO: Build carrasousel with cards
	return (
		<div>
			<h3>Popular MYtineraries</h3>
			<div className={classes.cardsContainer}>
				{filterByCurrentSlide(cities).map((city: any, index: Number) => {
					return <CityCard cityName={city} key={index} />;
				})}
				<DestinationControls
					slideLength={slideLength}
					slideIndex={slideIndex}
					onButtonClick={onButtonClick}
				/>
			</div>
		</div>
	);
}
