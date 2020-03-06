import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import CommentMenu from "./CommentMenu";

//MATERIAL-UI
import { makeStyles, createStyles, Theme, Typography, Button } from "@material-ui/core";

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

	// const [author, setAuthor] = React.useState<any>({
	// 	// authorAvatar: ,
	// 	userIsAuthor: false,

	// })
	//State
	const [userIsAuthor, setUserIsAuthor] = React.useState(false);

	React.useEffect(() => {
		const checkUserPrivileges = async () => {
			let response = await fetch("http://localhost:5000/usersAPI/validate", {
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
		return () => {
			// setUserIsAuthor(false);
		};
	}, [comment.author.id, token]);

	const deleteComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		let api = "http://localhost:5000/commentsAPI/delete";
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
					// setUserIsAuthor(false);
					updateCommentArray("delete", res.id);
					// checkUserPrivileges();
				} else console.log(res);
			});
	};
	const dateComparison = (date: number) => {
		let current = Date.now();
		let difference = current - date;
		let diffHours = Math.floor(difference /(1000 * 60 * 60) % 60);
		if (diffHours >= 24) {
			let days = Math.floor(diffHours / 24);
			if (days >= 7){
				return Math.floor(days / 7) + "w"
			}
			return Math.floor(diffHours / 24) + "d"
		} else if(diffHours < 1) {
			return Math.floor(difference / (1000 * 60) % 60) + "m"
		}
		return diffHours + "h";
	}
	return (
		<div className={classes.root}>
			{/* <h4>{comment.title}</h4> */}
			<Typography className={classes.text}>
				<span className={classes.author}>{comment.author.name}</span> {comment.text}
			</Typography>
			<p className={classes.date}>{dateComparison(comment.posted)}</p>
			{/* {userIsAuthor ? <Button onClick={deleteComment}>X</Button> : null} */}
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
