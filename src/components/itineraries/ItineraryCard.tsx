import React, { FunctionComponent, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar } from "@material-ui/core";
import Spinner from "../global/Spinner";

type itineraryProps = {
	itinerary: any;
};

const useStyles = makeStyles({
	root: {
		maxWidth: "600px",
		"& header": {
			display: "flex",
			flexFlow: "row wrap",
		},
	},
	avatarContainer: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		alignItems: "center",
	},
	details: {},
	stats: {},
});

const ItineraryCard: FunctionComponent<itineraryProps> = ({ itinerary }): any => {
	const classes = useStyles();
	const [author, setAuthor] = useState({ itineraries: [], _id: "", name: "", img: "" });
	const [authorLoading, setAuthorLoading] = useState(true);
	const fetchAuthor = () => {
		setAuthorLoading(true);
		let authorId = itinerary.author_id;
		fetch(`http://localhost:5000/authors/${authorId}`)
			.then(res => res.json())
			.then(res => {
				setAuthor(res);
				setAuthorLoading(false);
			})
			.catch(err => console.error(err));
	};
	useEffect(() => {
		fetchAuthor();
		return () => {
			// setAuthor({});
		};
	}, []);
	const handleDuration = (duration: number): string | undefined => {
		if (duration >= 60) {
			return `${duration / 60} hours`;
		} else if (duration > 0) {
			return `${duration} minutes`;
		} else {
			return "--";
		}
	};
	return (
		<Paper className={classes.root}>
			<header>
				<div className={classes.avatarContainer}>
					<Avatar alt="" src="" />
					{authorLoading ? <Spinner /> : <p>{author.name}</p>}
				</div>
				<div className={classes.details}>
					<h3>{itinerary.title}</h3>
					<div className={classes.stats}>
						<p>Likes: {itinerary.likes}</p>
						<p>Duration: {handleDuration(itinerary.duration)}</p>
						{/* <p>{'$' * itinerary.cost_rating}</p>  */}
					</div>
				</div>
			</header>
		</Paper>
	);
};

export default ItineraryCard;
