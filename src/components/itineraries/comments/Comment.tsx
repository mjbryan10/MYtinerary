import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

//MATERIAL-UI
import { makeStyles, createStyles, Theme, Typography, Button } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
	createStyles({
		root: {
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
			margin: 0,
			padding: " 0.6em",
			maxWidth: "100%",
			wordWrap: "break-word",
			position: "relative",
			whiteSpace: "normal",
			wordBreak: "break-word",
		},
	})
);

type commentProps = {
	comment: any;
	token: string;
	refreshComments: any;
};

const Comment: FunctionComponent<commentProps> = ({
	comment,
	token,
	refreshComments,
}) => {
	const classes = useStyle();

	// const [author, setAuthor] = React.useState<any>({
	// 	// authorAvatar: ,
	// 	userIsAuthor: false,

	// })
	//State
	const [userIsAuthor, setUserIsAuthor] = React.useState(false);
	React.useEffect(() => {
		checkUserPrivileges().then(res => {
			console.log("res", res);
			if (res.success) {
				setUserIsAuthor(true);
			} else setUserIsAuthor(false);
		});
		return () => {
			// setUserIsAuthor(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkUserPrivileges = async () => {
		let api = "http://localhost:5000/usersAPI/validate";
		let response = await fetch(api, {
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
					setUserIsAuthor(false);
					refreshComments();
					// checkUserPrivileges();
				}
				else console.log(res)
			});
	}
	return (
		<div key={comment._id} className={classes.root}>
			{/* <h4>{comment.title}</h4> */}
			<Typography className={classes.text}>
				<Typography display="inline" color="primary">
					{comment.author.name}
				</Typography>{" "}
				{comment.text}
			</Typography>
			{userIsAuthor ? <Button onClick={deleteComment}>X</Button> : null}
			{/*Insert delete option here, if authorisUser */}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		token: state.login.token,
	};
};

export default connect(mapStateToProps)(Comment);
