import React, { FunctionComponent, useState, useEffect } from "react";
import Spinner from "../global/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Button } from "@material-ui/core";

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
	avatarContainer: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		alignItems: "center",
		padding: "0.2rem",
		margin: "0 1rem",
	},
	details: {
		// textAlign: 'center',
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
        // justifyContent: "space-evenly",
        "& p": {
            // marginRight: '1em'
            margin: "0 0.5em",
        }
	},
	costIndex: {
		fontWeight: 500,
		fontSize: "1.1em",
	},
	tags: {
		// display: 'flex',
		// justifyContent: 'space-evenly',
		// textAlign: 'center',
		"& span": {
			margin: "0 0.5em",
		},
	},
	moreBtn: {
		width: "100%",
	},
});

const ItineraryCard: FunctionComponent<itineraryProps> = ({ itinerary }): any => {
    const classes = useStyles();
    const authorInitialState = { itineraries: [], _id: "", name: "", img: "" };
	const [author, setAuthor] = useState(authorInitialState);
    const [authorLoading, setAuthorLoading] = useState(true);
    const [moreToggled, setmoreToggled] = useState(false);
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
			setAuthor(authorInitialState);
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
    const handleMoreToggle = (e:any): void => setmoreToggled(!moreToggled);
	return (
		<Paper className={classes.root} elevation={3}>
			<header>
				<div className={classes.avatarContainer}>
					<Avatar alt="" src="" />
					{authorLoading ? <Spinner /> : <p>{author.name}</p>}
				</div>
				<div className={classes.details}>
					<h3>{itinerary.title}</h3>
					<div className={classes.stats}>
						<p>Likes: {itinerary.likes}</p>
						<p>{handleDuration(itinerary.duration)}</p>
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
            {moreToggled ? (<article>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vitae omnis
				aspernatur ullam temporibus recusandae quis facere aliquam nulla impedit ipsum,
				voluptates molestiae laboriosam repudiandae quaerat porro officia cumque quos.
			</article>) : null}
			<Button className={classes.moreBtn} size="small" color="primary" onClick={handleMoreToggle}>
				View All
			</Button>
		</Paper>
	);
};

export default ItineraryCard;
