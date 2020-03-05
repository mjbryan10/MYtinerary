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
};

//TODO!!!
function Comments(props: any) {
	const classes = useStyles();
	const { loggedIn, itinId } = props;
	//STATE:
	const [comments, setComments] = useState<State>({
		pending: true,
		success: null,
		data: [],
		page: 0,
	});
	useEffect(() => {
		//OnMount:
		fetchComments(itinId);
	}, []);
	useEffect(() => {
		fetchComments(itinId, comments.page);
	}, [comments.page]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	function fetchComments(itin: string, page: number | null = null) {
		setComments({ ...comments, pending: true });
		let api = `http://localhost:5000/commentsAPI/${itin}`;
		if (page) api += `/${page}`;
		fetch(api)
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					setComments({ ...comments, pending: false, success: true, data: res.comments });
				} else {
					setComments({ ...comments, pending: false, success: false, data: [] });
				}
			});
	}
	const refreshComments = () => {
		//refreshes comments when user submits a comment, from CommentForm.
		fetchComments(itinId, comments.page);
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
	const displayLoadMore = (): any => {
		if (
			comments.success === true &&
			comments.page === 0 &&
			(comments.data.length === 3 || comments.data.length === comments.page * 10)
		) {
			return (
				<Button className={classes.loader} color="secondary" onClick={loadComments("more")}>
					Load more...
				</Button>
			);
		} else return null;
	};
	return (
		<div className={classes.root}>
			<h4>Comments:</h4>
			{loggedIn ? (
				<CommentForm itinId={itinId} refreshComments={refreshComments} />
			) : (
				<div>
					<Link to="/login">Log in to leave a comment</Link>
				</div>
			)}
			{/* Comments will be displayed here! */}
			{comments.pending ? <Spinner /> : null}
			{comments.success
				? comments.data.map((comment: any, index: number) => (
						<Comment index={index} comment={comment} refreshComments={refreshComments} />
						// <div key={index}>
						// 	<h4>{comment.title}</h4>
						// 	<p>{comment.text}</p>
						// 	{console.log("Comments -> comment", comment)}
						// </div>
				  ))
				: null}
			{comments.success === false ? (
				<p>No comments yet. Be the first and leave a comment!</p>
			) : null}
			{displayLoadMore()}
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
