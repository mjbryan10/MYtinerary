import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import { Paper, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SubmitButton from "../global/SubmitButton";
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
	})
);
interface State {
	email: string;
	password: string;
}

function LoginPage() {
	const classes = useStyles();
	//STATE:
	const [values, setValues] = useState<State>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});
	//FUNCTIONS:
	const handleValueChange = (prop: keyof State, newValue: any) => {
		setValues({ ...values, [prop]: newValue });
		setErrors({ ...errors, [prop]: "" }); //Reset errors not working
	};
	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleValueChange(prop, event.target.value);
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		let errorsObj: any = {...errors};
		if (!values.email.length) {
			errorsObj.email = "Please enter your email"
		}
		if (!values.password.length) {
			errorsObj.password = "Please enter your password"
		}
		setErrors(errorsObj);
		const { email, password } = values;
		console.log (email, password)
	};
	return (
		<div className={classes.root}>
			<Paper elevation={3}>
				<form className={classes.formRoot} onSubmit={handleSubmit}>
					<FormControl>
						<InputLabel htmlFor="email-input">Email address</InputLabel>
						<Input
							error={errors.email.length ? true : false}
							id="email-input"
							onChange={handleChange("email")}
						/>
						<FormHelperText id="email-helper-text">
							{errors.email.length ? errors.email : null}
						</FormHelperText>
					</FormControl>

					<PasswordInput
						onValueChange={handleValueChange}
						validPassword={errors.password.length ? false : true}
						errorString={errors.password}
					/>
					<SubmitButton
						// loading={isPosting}
						// success={success}
						text="Log in"
						successText="Success!"
					/>
				</form>
			</Paper>
		</div>
	);
}

export default LoginPage;
