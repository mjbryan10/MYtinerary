import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			alignItems: "center",
		},
		wrapper: {
			margin: theme.spacing(1),
			position: "relative",
		},
		buttonSuccess: {
			backgroundColor: green[500],
			"&:hover": {
				backgroundColor: green[700],
			},
		},
		buttonProgress: {
			color: green[500],
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: -12,
			marginLeft: -12,
		},
	})
);

type SubmitButtonProps = {
	text?: string;
	successText?: string;
    // loading: boolean;
	// success: boolean;
    loading?: boolean;
	success?: boolean;
};

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
    text,
    successText,
	loading,
	success,
}) => {
	const classes = useStyles();

	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	});
	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<Button
					variant="contained"
					color="primary"
					className={buttonClassname}
					disabled={loading}
					type="submit"
				>
					{success ? successText : text || "Submit"}
				</Button>
				{loading && <CircularProgress size={24} className={classes.buttonProgress} />}
			</div>
		</div>
	);
};
export default SubmitButton;
