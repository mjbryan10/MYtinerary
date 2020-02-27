import React from "react";
import PasswordInput from "./PasswordInput";
import UploadImage from "./UploadImage";
import {
	// TextField,
	Button,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Paper,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) => 
	createStyles({
	root: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	formRoot: {
		display: "flex",
		flexFlow: "column nowrap",
		alignItems: "center",
		justifyContent: "space-around",
		padding: "2em 3em",
		maxWidth: "500px",
		minHeight: "400px",
		margin: "0 auto",
	},
	upload: {
		display: "flex",
	},
}));

function CreateAccount() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper elevation={3}>
				<form className={classes.formRoot}>
					<FormControl>
						<InputLabel htmlFor="email-input">Email address</InputLabel>
						<Input id="email-input" aria-describedby="my-helper-text" />
						<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
					</FormControl>
					{/* <TextField id="standard-basic" label="Username" style={{ margin: "8px" }} /> */}
					<PasswordInput />
					{/* <PasswordInput /> */}
					<div className={classes.upload}>
						<AccountCircleIcon fontSize="large" color="primary" />
						<UploadImage />
					</div>
					<Button
						variant="contained"
						color="secondary"
						// className={classes.button}
					>
						Create Account
					</Button>
				</form>
			</Paper>
		</div>
	);
}

export default CreateAccount;
