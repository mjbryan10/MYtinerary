import React from "react";
// import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
	createStyles({
		controlsContainer: {
			display: "flex",
			flexFlow: "row wrap",
			width: "100%",
			maxWidth: "800px",
			justifyContent: "center",
			alignItems: "center",
			height: "25px",
			padding: "2px",
			"& > *": {
				margin: "0 2px",
			},
			// color: "blue",
		},
		buttonControls: {
			height: "25px",
			"& .MuiButton-startIcon": {
				margin: 0,
			},
			"& *": {
				pointerEvents: "none",
			},
		},
	})
);

export default function DestinationControls(props: any) {
	const classes = useStyles();
	const { slideIndex, slideLength, onButtonClick } = props;
	const handleClick = (e: any) => {
		e.preventDefault();
		onButtonClick(e.target.value);
		console.log("TCL: handleClick -> e.target.value", e.target.value);
	};
	return (
		<div className={classes.controlsContainer}>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}
				value="left"
				startIcon={<NavigateBeforeIcon />}
				className={classes.buttonControls}
			/>
			{[...Array(slideLength)].map((element, index) => {
				return slideIndex === index ? (
					<span key={index} className="span-dot current"></span>
				) : (
					<span key={index} className="span-dot"></span>
				);
			})}
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}
				value="right"
				startIcon={<NavigateNextIcon />}
				className={classes.buttonControls}
			></Button>
		</div>
	);
}
