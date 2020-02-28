import React, { useState } from "react";
// import Spinner from "../global/Spinner";
import SubmitButton from '../global/SubmitButton';
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
	})
);

interface State {
	email: string;
	password: string;
	img: string; //???
}
interface ValidState {
	email: boolean;
	password: boolean;
}

function CreateAccount() {
	const classes = useStyles();
	const [values, setValues] = useState<State>({
		email: "",
		password: "",
		img: "",
	});
	const [valid, setValid] = useState<ValidState | any>({
		email: true,
		password: true,
	});
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<any>({
		email: "",
		password: "",
	});
	const [isPosting, setIsPosting] = useState(false);
	const handleValueChange = (prop: keyof State, newValue: any) => {
		setValues({ ...values, [prop]: newValue });
	};
	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleValueChange(prop, event.target.value);
	};
	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const { email, password } = values;
		setValid({
			...valid,
			email: validateEmail(email),
			password: validatePassword(password),
		});
		setIsPosting(true);
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
				if (res.errors) {
					//TODO ACCESS THE ERRORS AND UPDATE STATE
					updateErrors(res.erorrs);
				} else {
					setSuccess(true);
				}
				console.log("TCL: handleSubmit -> res", res);
				setIsPosting(false);
			})
			.catch(err => {
				console.error(err);
				setSuccess(false);
				setIsPosting(false);
				setErrors(err);
			});
	};
	// console.log(validateSubmit());

	//Validation functions:
	function validateEmail(email: string): boolean {
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		} else {
			return false;
		}
	}
	function validatePassword(password: string): boolean {
		if (password.length >= 4) {
			return true;
		}
		return false;
	}
	// function validateSubmit(): boolean {
	// 	//NEEDS REFACTORING
	// 	for (const key in valid) {
	// 		if (!valid[key]) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// }
	function updateErrors(result: any): void {
		for (const key in result) {
			if (result.hasOwnProperty(key)) {
				const value = result[key];
				setErrors({ ...errors, key: value });
			}
		}
	}
	return (
		<div className={classes.root}>
			<Paper elevation={3}>
				<form className={classes.formRoot} onSubmit={handleSubmit}>
					<FormControl>
						<InputLabel htmlFor="email-input">Email address</InputLabel>
						<Input
							error={!valid.email}
							id="email-input"
							aria-describedby="my-helper-text"
							onChange={handleChange("email")}
						/>
						<FormHelperText id="email-helper-text">
							{valid.email ? "We'll never share your email." : "Please provide a valid email"}
						</FormHelperText>
					</FormControl>
					{/* <TextField id="standard-basic" label="Username" style={{ margin: "8px" }} /> */}
					<PasswordInput onValueChange={handleValueChange} validPassword={valid.password} />
					{/* <PasswordInput /> */}
					<div className={classes.upload}>
						<AccountCircleIcon fontSize="large" color="primary" />
						<UploadImage />
					</div>
					{/* <Button
						type="submit"
						variant="contained"
						color="secondary"
					>
						{!isPosting ? <Spinner height="25px" width="150px" /> : "Create Account"}
					</Button> */}
				<SubmitButton loading={isPosting} success={success} text="Create Account" />
				</form>
				{/* {success ? <p>Welcome!</p> : null} */}
				{/* {success === false ? <p>Oops, something went wrong. Please try again</p> : null} */}
			</Paper>
		</div>
	);
}

export default CreateAccount;
