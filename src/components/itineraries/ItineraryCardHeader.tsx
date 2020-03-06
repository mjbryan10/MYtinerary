import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthorAvatar from "../author/AuthorAvatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";

// import { updateFavourites as updateFavouritesAction } from "../../store/actions/userActions";

type itineraryProps = {
	itinerary: any;
	// isFavourite: boolean;
	// onHeartChange: any;
	id: string;
	favourites: any;
	token: string;
	// updateFavourites: any;
};

const useStyles = makeStyles({
	header: {
		display: "flex",
		flexFlow: "row wrap",
	},
	details: {
		flex: "1 0 auto",
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "flex-start",
		padding: "0.2rem",
		"h1, h2, h3, h4": {
			padding: 0,
		},
	},
	stats: {
		display: "flex",
		"& p": {
			margin: "0 0.5em",
		},
	},
	costIndex: {
		fontWeight: 500,
		fontSize: "1.1em",
	},
	tags: {
		"& span": {
			margin: "0 0.5em",
		},
	},
	input: {
		display: "none",
	},
	heart: {
		margin: "3px",
		color: "#dc2b00",
		"&:hover": {
			cursor: "pointer",
			transform: "scale(1.1)",
		},
	},
});

const ItineraryCardHeader: FunctionComponent<itineraryProps> = ({
	itinerary,
	// isFavourite,
	// onHeartChange,
	id,
	favourites,
	token,
	// updateFavourites
}): any => {
	const classes = useStyles();

	const calcDuration = (duration: number): string | undefined => {
		if (duration >= 60) {
			return `${duration / 60} hours`;
		} else if (duration > 0) {
			return `${duration} minutes`;
		} else {
			return "--";
		}
	};
	const [isFav, setIsFav] = useState(false);
	const onHeartChange = () => {
		// setIsFav(!isFav);
		let action = "";
		isFav ? (action = "del") : (action = "add");
		updateFavourites(action, itinerary._id, token);
	};
	useEffect(() => {
		if (favourites.length) {
			if (favourites.includes(itinerary._id)) {
				setIsFav(true);
				// console.log("setIsFav", isFav);
			} else {
				setIsFav(false);
				// console.log("setIsFav", isFav);
			}
		} else {
			setIsFav(false);
		}
	}, [favourites, itinerary._id]);
	const updateFavourites = (action: string, itinId: string, token: string) => {
		fetch(`http://localhost:5000/usersAPI/${action}/fav`, {
			method: "put",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-api-key": token,
			},
			body: JSON.stringify({ fav: itinId }),
		})
			.then((res: any) => res.json())
			.then((res: any) => {
				if (res.success) {
					setIsFav(!isFav);
				}
			});
	};

	return (
		<header className={classes.header}>
			<AuthorAvatar authorId={itinerary.author_id} variant="named" />
			<div className={classes.details}>
				<h3>{itinerary.title}</h3>
				<div className={classes.stats}>
					<p>Likes: {itinerary.likes}</p>
					<p>{calcDuration(itinerary.duration)}</p>
					<p className={classes.costIndex}>
						{[...Array(itinerary.cost_rating)].map((cost, index: number) => (
							<span key={index}>$</span>
						))}
					</p>
				</div>
				<p className={classes.tags}>
					{itinerary.tags.map((tag: string, index: number) => (
						<span key={index}>#{tag} </span>
					))}
				</p>
			</div>

			<input
				className={classes.input}
				id={`icon-heart-${id}`}
				type="checkbox"
				checked={isFav}
				onChange={onHeartChange}
			/>
			<label htmlFor={`icon-heart-${id}`}>
				{isFav ? (
					<FavoriteIcon className={classes.heart} />
				) : (
					<FavoriteBorderIcon className={classes.heart} />
				)}
			</label>
		</header>
	);
};

const mapStateToProps = (state: any) => {
	return {
		favourites: state.currentUser.details.favourites,
		token: state.login.token,
	};
};

// const mapDispatchToProps = (dispatch: any) => {
// 	return {
// 		updateFavourites: (action: string, itinId: string, token: string) =>
// 			dispatch(updateFavouritesAction(action, itinId, token)),
// 	};
// };

export default connect(mapStateToProps)(ItineraryCardHeader);
