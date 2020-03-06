import React, { useReducer, useEffect } from "react";
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
//TS STATE:
type State = {
	pending: boolean;
	success: boolean | null;
	data: any;
	page: number;
	count: number;
};
const initialState: State = {
	pending: true,
	success: null,
	data: [],
	page: 0,
	count: 0,
};
//TYPES
const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";
const UPDATE_DATA = "UPDATE_DATA";
const INCREMENT_PAGE_COUNT = "INCREMENT_PAGE_COUNT";
const RESET_PAGE_COUNT = "RESET_PAGE_COUNT";
//ACTIONS + REDUCER
const pendingAction = () => {
	return {
		type: PENDING,
	};
};
const successAction = (payload: any) => {
	return {
		type: SUCCESS,
		payload,
	};
};
const failAction = () => {
	return {
		type: FAIL,
	};
};
const updateAction = (command: string, payload: any) => {
	return {
		type: UPDATE_DATA,
		command,
		payload,
	};
};
const changePageAction = (command: string) => {
	if (command === "more") {
		return {
			type: INCREMENT_PAGE_COUNT,
		};
	} else if (command === "less") {
		return {
			type: RESET_PAGE_COUNT,
		};
	}
};

function reducer(state: any, action: any) {
	switch (action.type) {
		case PENDING:
			return {
				...state,
				pending: true,
			};
		case SUCCESS:
			return {
				...state,
				pending: false,
				success: true,
				data: action.payload.comments,
				count: action.payload.count,
			};
		case FAIL:
			return {
				...state,
				pending: false,
				success: false,
				data: [],
				count: 0,
			};
		case UPDATE_DATA:
			if (action.command === "add") {
				return {
					...state,
					count: state.count + 1,
					data: [action.payload, ...state.data],
				};
			} else if (action.command === "delete") {
				return {
					...state,
					count: state.count - 1,
					data: [
						...state.data.filter((comment: any) => {
							return comment._id !== action.payload;
						}),
					],
				};
			}
			return { ...state };
		case INCREMENT_PAGE_COUNT:
			return {
				...state,
				page: state.page + 1,
			};
		case RESET_PAGE_COUNT:
			return {
				...state,
				page: 0,
			};
		default:
			throw new Error();
	}
}
function Comments(props: any) {
	const classes = useStyles();
	const { loggedIn, itinId } = props;

	const [comments, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		function getFetchUrl() {
			return `http://localhost:5000/commentsAPI/${itinId}/${comments.page}`;
		}
		async function fetchComments() {
			dispatch(pendingAction());
			let response = await fetch(getFetchUrl()).then(res => res.json());
			let res = await response;
			if (res.success) {
				dispatch(successAction({ comments: res.comments, count: res.count }));
			} else if (!res.success) {
				dispatch(failAction());
			}
		}
		fetchComments();
	}, [comments.page, itinId]);

	const updateCommentArray = (command: string, data: string | object) => {
		//Removes or adds to array without need of re-render.
		dispatch(updateAction(command, data));
	};
	const loadComments = (command: string) => (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		//increases load amount dep on page, or resets page to 0
		event.preventDefault();
		dispatch(changePageAction(command));
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
			{comments.data.length
				? comments.data.map((comment: any) => (
						<Comment
							key={comment._id}
							comment={comment}
							updateCommentArray={updateCommentArray}
						/>
				  ))
				: null}
			{comments.data.length  ? null : (
				<p>No comments yet. Be the first and leave a comment!</p>
			)}
			{comments.count > comments.data.length && comments.data.length !== 0 ? (
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
