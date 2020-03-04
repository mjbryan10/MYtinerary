import React, { useState } from "react";
import { connect } from "react-redux";
import { updateLoginStatus } from "../../store/actions/loginActions";
import PasswordInput from "./PasswordInput";
import { Paper, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SubmitButton from "../global/SubmitButton";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
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

function LoginPage(props: any) {
	const classes = useStyles();
	//STATE:
	const [values, setValues] = useState<State>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<State>({
		email: "",
		password: "",
	});
	const [loading, setloading] = useState<boolean>(false);
	const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
	const [redirectToHome, setRedirectToHome] = useState<boolean>(false);
	//FUNCTIONS:
	const handleValueChange = (prop: keyof State, newValue: any) => {
		setValues({ ...values, [prop]: newValue });
		// if (errors.email === errors.password) {
		// 	console.log("handleValueChange -> email", errors.email);
		// 	let clearedErrors = { email: "", password: "" };
		// 	setErrors(clearedErrors);
		// } //TODO fix bug with login feedback
		setErrors({ ...errors, [prop]: "" });
	};
	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleValueChange(prop, event.target.value);
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		let errorsObj: any = { ...errors };
		if (!values.email.length) {
			errorsObj.email = "Please enter your email";
		}
		if (!values.password.length) {
			errorsObj.password = "Please enter your password";
		}
		if (errorsObj.email.length || errorsObj.password.length) {
			setErrors(errorsObj);
		} else {
			const { email, password } = values;
			setloading(true);
			window.localStorage.removeItem("session_token");
			submitLogin(email, password)
				.then((res: any): any => {
					if (res.success) {
						window.localStorage.setItem("session_token", res.token);
						setLoginSuccess(true);
						setTimeout(function(){ setRedirectToHome(true); }, 800);
					} else {
						setErrors({ email: res.msg, password: res.msg });
					}
					setloading(false);
					props.updateLoginStatus();
				})
				.catch(err => {
					console.error(err);
					setloading(false);
					props.updateLoginStatus();
				});
		}
	};
	async function submitLogin(email: string, password: string): Promise<any> {
		let response = await fetch("http://localhost:5000/usersAPI/login", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		return await response.json();
	}
	if (redirectToHome) {
		return <Redirect to="/" />;
	}
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
						loading={loading}
						success={loginSuccess}
						text="Log in"
						successText="Success!"
					/>
				</form>
			</Paper>
		</div>
	);
}
//REDUX:
const mapStatetoProps = (state: any): object => {
	return {
		loggedIn: state.login.loggedIn,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			updateLoginStatus,
		},
		dispatch
	);
export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);

//ADD REDUX PROPS and FUNCTIONS
