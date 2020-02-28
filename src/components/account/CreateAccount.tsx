import React, { useState } from "react";
import SubmitButton from "../global/SubmitButton";
import PasswordInput from "./PasswordInput";
import UploadImage from "./UploadImage";
import SimplePopover from "../global/SimplePopover";
import {
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Paper,
} from "@material-ui/core";

//STYLES
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
	})
);
//TYPES
interface State {
	email: string;
	password: string;
	img: string; //???
}
interface duplicateState {
	isDuplicate: boolean;
	msg: string;
}
//COMPONENT
function CreateAccount() {
	const classes = useStyles();
	const [values, setValues] = useState<State>({
		email: "",
		password: "",
		img: "",
	});
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>({
		email: "",
		password: "",
	});
	const [isPosting, setIsPosting] = useState(false);
	const [duplicateEmail, setDuplicateEmail] = useState<duplicateState>({
		isDuplicate: false,
		msg: "",
	});

	const handleValueChange = (prop: keyof State, newValue: any) => {
		setValues({ ...values, [prop]: newValue });
		setErrors({...errors, [prop]: ""}); //Reset errors not working

	};
	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleValueChange(prop, event.target.value);
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setIsPosting(true);
		postUser();
	};
	function postUser() {
		const { email, password } = values;
		fetch("http://localhost:5000/usersAPI/", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		})
			.then(res => res.json())
			.then(res => {
				if (res.hasOwnProperty("errors")) {
					updateErrors(res.errors);
				} else if (res.hasOwnProperty("duplicate")) {
					setDuplicateEmail({
						isDuplicate: res.duplicate,
						msg: res.msg,
					});
				} else {
					setSuccess(true);
				}
				setIsPosting(false);
			})
			.catch(err => {
				console.error(err);
				setSuccess(false);
				setIsPosting(false);
				setErrors(err);
			});
	}
	function updateErrors(result: any): void {
		let object: any = { ...errors };
		for (let i = 0; i < result.length; i++) {
			const error = result[i];
			let key = error.param;
			let value = error.msg;
			object[key] = value;
		}
		setErrors(object);
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
							{errors.email.length
								? "Please provide a valid email"
								: "We'll never share your email."}
						</FormHelperText>
					</FormControl>
					<SimplePopover
						textString="This email is already in use"
						elementAnchor={
							duplicateEmail.isDuplicate ? document.getElementById("email-input") : null
						}
					/>
					<PasswordInput
						onValueChange={handleValueChange}
						validPassword={!errors.password.length}
						errorString={errors.password}
					/>
					<div className={classes.upload}>
						<AccountCircleIcon fontSize="large" color="primary" />
						<UploadImage />
					</div>
					<SubmitButton loading={isPosting} success={success} text="Create Account" successText="Account Created!" />
				</form>
			</Paper>
		</div>
	);
}

export default CreateAccount;
