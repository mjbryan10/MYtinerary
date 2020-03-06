import React, { FunctionComponent, useState, useEffect } from "react";
// import { connect } from "react-redux";

// import Spinner from "../global/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import ItineraryCardHeader from "./ItineraryCardHeader";
import ItineraryActivties from "./ItineraryActivties";
// import { updateFavourites as updateFavouritesAction } from "../../store/actions/userActions";

type itineraryProps = {
	itinerary: any;
	// favourites: [string];
	// updateFavourites: any;
	// token: string;
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

const ItineraryCard: FunctionComponent<itineraryProps> = ({
	itinerary,
	// favourites,
	// updateFavourites,
	// token,
}): any => {
	const classes = useStyles();
	const [moreToggled, setmoreToggled] = useState(false);
	// const [isFav, setIsFav] = useState(false);
	const handleMoreToggle = (e: any): void => setmoreToggled(!moreToggled);
	// const onHeartChange = () => {
	// 	// setIsFav(!isFav);
	// 	let action = "";
	// 	isFav ? (action = "del") : (action = "add");
	// 	updateFavourites(action, itinerary._id, token);
	// };
	// useEffect(() => {
	// 	if (favourites.length) {
	// 		if (favourites.includes(itinerary._id)) {
	// 			setIsFav(true);
	// 			// console.log("setIsFav", isFav);
	// 		} else {
	// 			setIsFav(false);
	// 			// console.log("setIsFav", isFav);
	// 		}
	// 	} else {
	// 		setIsFav(false);
	// 	}
	// }, [favourites, itinerary._id]);
	return (
		<Paper className={classes.root + " fade-in"} elevation={3}>
			<ItineraryCardHeader
				id={itinerary._id}
				itinerary={itinerary}
				// isFavourite={isFav}
				// onHeartChange={onHeartChange}
			/>
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

// const mapStateToProps = (state: any) => {
// 	return {
// 		favourites: state.currentUser.details.favourites,
// 		token: state.login.token,
// 	};
// };

// const mapDispatchToProps = (dispatch: any) => {
// 	return {
// 		updateFavourites: (action: string, itinId: string, token: string) =>
// 			dispatch(updateFavouritesAction(action, itinId, token)),
// 	};
// };

export default ItineraryCard;
// export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard);
