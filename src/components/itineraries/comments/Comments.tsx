import React from "react";
import { Link } from "react-router-dom";

//REDUX
import { connect } from "react-redux";

function Comments(props: any) {
	const { loggedIn } = props;
	return (
		<div>
			<h4>Comments:</h4>
			{loggedIn ? (
				<form action="">
					<input type="text" placeholder="Your comment..." />
					<input type="submit" name="Post" id="submit_comment" />
				</form>
			) : (
				<div>
					<Link to="/login">Log in to leave a comment</Link>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		loggedIn: state.login.loggedIn,
	};
};

export default connect(mapStateToProps)(Comments);
