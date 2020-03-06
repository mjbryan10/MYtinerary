import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

//REDUX
import { connect } from "react-redux";
import Spinner from "../../global/Spinner";

//MATERIAL-UI
import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
			},
		},
		loader: {
			display: "block",
		},
	})
);
//TS:
type State = {
	pending: boolean;
	success: boolean | null;
	data: any;
	page: number;
	count: number;
};

function Comments(props: any) {
	const classes = useStyles();
	const { loggedIn, itinId } = props;
	//STATE:
	const [comments, setComments] = useState<State>({
		pending: true,
		success: null,
		data: [],
		page: 0,
		count: 0,
	});
	// useEffect(() => {
	// 	//OnMount:
	// 	fetchComments(itinId, comments.page);
	// }, [comments.page]);
	useEffect(() => {
		function getFetchUrl() {
			return `http://localhost:5000/commentsAPI/${itinId}/${comments.page}`
		}
		async function fetchComments() {
			setComments({ ...comments, pending: true });
			let response = await fetch(getFetchUrl()).then(res => res.json());
			let res = await response;
			if (res.success) {
				setComments({
					...comments,
					pending: false,
					success: true,
					data: res.comments,
					count: res.count,
				});
			} else if (!res.success) {
				setComments({ ...comments, pending: false, success: false, data: [] });
			}
		}
		fetchComments();
	}, [comments.page, itinId]);
	// eslint-disable-next-line react-hooks/exhaustive-deps

	// const refreshComments = () => {
	// 	//refreshes comments when user submits a comment, from CommentForm.
	// 	// setComments({...comments, data: []});
	// 	fetchComments(itinId, comments.page);
	// };
	const updateCommentArray = (type: string, data: string | object) => {
		if (type === "delete") {
			console.log("updateCommentArray ->", type, data);
			// let id = data;
			setComments({
				...comments,
				data: [
					...comments.data.filter((comment: any) => {
						console.log("updateCommentArray -> comment", comment);
						return comment._id !== data;
					}),
				],
			});
		} else if (type === "add") {
			setComments({
				...comments,
				data: [data, ...comments.data],
			});
		}
	};
	const loadComments = (amount: string) => (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		event.preventDefault();
		if (amount === "more") {
			setComments({ ...comments, page: comments.page += 1 });
		} else if (amount === "less") {
			setComments({ ...comments, page: 0 });
		}
	};
	return (
		<div className={classes.root}>
			<h4>Comments:</h4>
			{loggedIn ? (
				<CommentForm itinId={itinId} updateCommentArray={updateCommentArray} />
			) : (
				<div>
					<Link to="/login">Log in to leave a comment</Link>
				</div>
			)}
			{comments.pending ? <Spinner /> : null}
			{comments.success
				? comments.data.map((comment: any) => (
						<Comment comment={comment} updateCommentArray={updateCommentArray} />
				  ))
				: null}
			{comments.success === false ? (
				<p>No comments yet. Be the first and leave a comment!</p>
			) : null}
			{comments.count > comments.data.length ? (
				<Button className={classes.loader} color="secondary" onClick={loadComments("more")}>
					Load more...
				</Button>
			) : null}
			{comments.page > 0 ? (
				<Button className={classes.loader} color="secondary" onClick={loadComments("less")}>
					Show less
				</Button>
			) : null}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		loggedIn: state.login.loggedIn,
		token: state.login.token,
	};
};

export default connect(mapStateToProps)(Comments);
