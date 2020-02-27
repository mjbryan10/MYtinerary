import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthorAvatar from "../author/AuthorAvatar";

type itineraryProps = {
	itinerary: any;
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
});

const ItineraryCardHeader: FunctionComponent<itineraryProps> = ({ itinerary }): any => {
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
		</header>
	);
};
export default ItineraryCardHeader;
