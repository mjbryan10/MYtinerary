import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
			},
		},
		input: {
			display: "none",
		},
	})
);

export default function UploadImage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<input
				accept="image/*"
				className={classes.input}
				id="contained-button-file"
				multiple
				type="file"
			/>
			<label htmlFor="contained-button-file">
				<Button
          // disabled
					variant="contained"
					color="secondary"
					component="span"
					startIcon={<CloudUploadIcon />}
				>
					Upload
				</Button>
			</label>
		</div>
	);
}
