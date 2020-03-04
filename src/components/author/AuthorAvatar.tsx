import React, { useState, useEffect, FunctionComponent } from "react";
import { makeStyles, Avatar } from "@material-ui/core";
import Spinner from "../global/Spinner";

type authorAvatarProps = {
	authorId: string;
	variant: string;
};

const useStyles = makeStyles({
	root: {
		maxWidth: "800px",
		margin: "8px auto",
		"& header": {
			display: "flex",
			flexFlow: "row wrap",
		},
		textOverflow: "ellipsis",
	},
	avatarContainer: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
		alignItems: "center",
		padding: "0.2rem",
		margin: "0 1rem",
		width: "130px",
	},
});

const AuthorAvatar: FunctionComponent<authorAvatarProps> = ({
	authorId,
	variant = "",
}) => {
	const classes = useStyles();
	//STATE:
	const authorInitialState = { itineraries: [], _id: "", name: "", img: "" };
	const [author, setAuthor] = useState(authorInitialState);
	const [authorLoading, setAuthorLoading] = useState(true);
	const fetchAuthor = () => {
		setAuthorLoading(true);
		fetch(`http://localhost:5000/authorsAPI/${authorId}`)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	switch (variant) {
		case "named":
			return (
				<div className={classes.avatarContainer}>
					<Avatar alt={author.name} src="" />
					{authorLoading ? <Spinner /> : <p>{author.name}</p>}
				</div>
			);
		default:
			return <Avatar alt={author.name} src="" />;
	}
};
export default AuthorAvatar;

//NOTE THIS MAY NEED TO BE UPDATED TO USERS IN UPCOMING UPDATES