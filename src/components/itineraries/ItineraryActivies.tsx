import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";

type ItineraryActiviesProps = {
	itinerary: any;
};

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexFlow: "column nowrap",
	},
	activitiesContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-evenly",
		overflowX: "auto",
	},
	activity: {
		backgroundColor: "#ccc",
		height: "100px",
		width: "200px",
		margin: "0 3px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

const ItineraryActivies: FunctionComponent<ItineraryActiviesProps> = ({ itinerary }) => {
	const classes = useStyles();
	return (
		<article className={classes.root + " fade-in"}>
			<h4>Activites:</h4>
			<div className={classes.activitiesContainer}>
				{itinerary.activities.map((activity: string, index: number) => (
					<div className={classes.activity} key={index}>
						<p>{activity}</p>
					</div>
				))}
			</div>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, vitae omnis aspernatur
			ullam temporibus recusandae quis facere aliquam nulla impedit ipsum, voluptates
			molestiae laboriosam repudiandae quaerat porro officia cumque quos.
		</article>
	);
};

export default ItineraryActivies;
