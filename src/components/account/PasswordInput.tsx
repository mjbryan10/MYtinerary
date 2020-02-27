import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexWrap: "wrap",
		},
		margin: {
			margin: theme.spacing(1),
		},
		withoutLabel: {
			marginTop: theme.spacing(3),
		},
		textField: {
			width: 200,
		},
	})
);

type Props = {
  onValueChange?: any;
  validPassword?: boolean;
};

interface State {
	password: string;
	showPassword: boolean;
}

const InputAdornments: React.FunctionComponent<Props> = ({ onValueChange, validPassword }) => {
	const classes = useStyles();
	const [values, setValues] = React.useState<State>({
		password: "",
		showPassword: false,
	});

	const handleChange = (prop: keyof State) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
    setValues({ ...values, [prop]: event.target.value });
		onValueChange("password", values.password);
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<div className={classes.root}>
			<div>
				<FormControl className={clsx(classes.margin, classes.textField)}>
					<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
					<Input
            error={!validPassword}
						id="stadard-adornment-password"
						type={values.showPassword ? "text" : "password"}
						value={values.password}
						onChange={handleChange("password")}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
          <FormHelperText>
							{validPassword ? null : "Passwords need to be longer than 4 characters"}
						</FormHelperText>
				</FormControl>
			</div>
		</div>
	);
};

export default InputAdornments;
