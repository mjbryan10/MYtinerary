import React, { FunctionComponent, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import ItineraryCardHeader from "./ItineraryCardHeader";
import ItineraryActivties from "./ItineraryActivties";

type itineraryProps = {
	itinerary: any;
};

const useStyles = makeStyles({
	root: {
		maxWidth: "800px",
		margin: "8px auto",
		"& header": {
			display: "flex",
			flexFlow: "row wrap",
		},
	},
	moreBtn: {
		width: "100%",
	},
});

const ItineraryCard: FunctionComponent<itineraryProps> = ({ itinerary }): any => {
	const classes = useStyles();
	const [moreToggled, setmoreToggled] = useState(false);
	const handleMoreToggle = (e: any): void => setmoreToggled(!moreToggled);
	return (
		<Paper className={classes.root + " fade-in"} elevation={3}>
			<ItineraryCardHeader id={itinerary._id} itinerary={itinerary} />
			{moreToggled ? <ItineraryActivties itinerary={itinerary} /> : null}
			<Button
				className={classes.moreBtn}
				size="small"
				color="primary"
				onClick={handleMoreToggle}
			>
				{moreToggled ? "Close" : "View all"}
			</Button>
		</Paper>
	);
};

export default ItineraryCard;
