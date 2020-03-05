import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

//REDUX
import { connect } from "react-redux";
import Spinner from "../../global/Spinner";

//STYLES --- TODO



//TS:
type State = {
	pending: boolean;
	success: boolean | null;
	data: any;
};


//TODO!!!
function Comments(props: any) {
	const { loggedIn, itinId } = props;
	//STATE:
	const [comments, setComments] = useState<State>({
		pending: true,
		success: null,
		data: [],
	});
	useEffect(() => {
		//OnMount:
		fetchComments(itinId);
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function fetchComments(itin: string) {
		setComments({ ...comments, pending: true });
		fetch(`http://localhost:5000/commentsAPI/${itin}`)
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					setComments({ pending: false, success: true, data: res.comments });
				} else {
					setComments({ pending: false, success: false, data: [] });
				}
			});
	}
	const onSubmit = () => {
		//refreshes comments when user submits a comment, from CommentForm.
		fetchComments(itinId);
	}
	return (
		<div>
			<h4>Comments:</h4>
			{loggedIn ? (
				<CommentForm itinId={itinId} onSubmit={onSubmit} />
			) : (
				<div>
					<Link to="/login">Log in to leave a comment</Link>
				</div>
			)}
			{/* Comments will be displayed here! */}
			{comments.pending ? <Spinner /> : null}
			{comments.success
				? comments.data.map((comment: any, index: number) => (
						<div key={index}>
							<h4>{comment.title}</h4>
							<p>{comment.text}</p>
						</div>
				  ))
				: null}
			{comments.success === false ? (
				<p>No comments yet. Be the first and leave a comment!</p>
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
