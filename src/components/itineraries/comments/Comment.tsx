import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import CommentMenu from "./CommentMenu";

//MATERIAL-UI
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexFlow: "row wrap",
			alignItems: "center",
			"& > *": {
				margin: theme.spacing(1),
			},
		},
		text: {
			backgroundColor: "#f2f3f5",
			borderRadius: "18px",
			boxSizing: "border-box",
			// color: "#1c1e21",
			display: "inline-block",
			lineHeight: "16px",
			margin: "auto 0",
			padding: " 0.6em",
			maxWidth: "100%",
			wordWrap: "break-word",
			position: "relative",
			whiteSpace: "normal",
			wordBreak: "break-word",
		},
		author: {
			color: theme.palette.primary.main,
		},
		date: {
			fontSize: "0.9em"
		}
	})
);

type commentProps = {
	comment: any;
	token: string;
	updateCommentArray: any;
};

const Comment: FunctionComponent<commentProps> = ({
	comment,
	token,
	updateCommentArray,
}) => {
	const classes = useStyle();

	//State
	const [userIsAuthor, setUserIsAuthor] = React.useState(false);

	React.useEffect(() => {
		const checkUserPrivileges = async () => {
			let response = await fetch("https://my-itinerary-demo.herokuapp.com/usersAPI/validate", {
				method: "post",
				headers: {
					Accept: "application/json, text/plain, */*",
					"content-Type": "application/json",
					"x-api-key": token,
				},
				body: JSON.stringify({
					id: comment.author.id,
				}),
			});
			return await response.json();
		};
		checkUserPrivileges().then(res => {
			if (res.success) {
				setUserIsAuthor(true);
			} else setUserIsAuthor(false);
		});
	}, [comment.author.id, token]);

	const deleteComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		let api = "https://my-itinerary-demo.herokuapp.com/commentsAPI/delete";
		fetch(api, {
			method: "delete",
			headers: {
				Accept: "application/json, text/plain, */*",
				"content-Type": "application/json",
				"x-api-key": token,
			},
			body: JSON.stringify({
				id: comment._id,
			}),
		})
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					updateCommentArray("delete", res.id);
				} else console.log(res);
			});
	};
	const dateComparison = (date: number) => {
		const current = Date.now();
		const difference = current - date;
		const diffMins = difference / 60000;
		if (diffMins < 60) {
			return Math.floor(diffMins) + "m";
		} else {
			let diffHours = diffMins / 60;
			if (diffHours >= 24) {
				let days = Math.floor(diffHours / 24);
				if (days >= 7){
					return Math.floor(days / 7) + "w"
				}
				return Math.floor(diffHours / 24) + "d"
			} 
			return Math.floor(diffHours) +"h"
		}
	}
	return (
		<div className={classes.root + " fade-in"}>
			<Typography className={classes.text}>
				<span className={classes.author}>{comment.author.name}</span> {comment.text}
			</Typography>
			<p className={classes.date}>{dateComparison(comment.posted)}</p>
			{userIsAuthor ? <CommentMenu deleteComment={deleteComment} /> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		token: state.login.token,
	};
};

export default connect(mapStateToProps)(Comment);
