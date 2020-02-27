import React from "react";

function Comments() {
	return (
		<div>
			<h4>Comments:</h4>
			<form action="">
				<input type="text" placeholder="Your comment..." />
				<input type="submit" name="Post" id="submit_comment" />
			</form>
		</div>
	);
}

export default Comments;
