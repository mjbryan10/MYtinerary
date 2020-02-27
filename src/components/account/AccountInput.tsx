import React, { FunctionComponent } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		margin: {
			margin: theme.spacing(1),
		},
	})
);

type props = {
    placeholder: string;
    // icon: FunctionComponent;
    //POSSIBLE TO DO: make the icon dynamicly loaded. 
}

 const AccountInput: FunctionComponent<props> = ({placeholder}) => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.margin}>
				<Grid container spacing={1} alignItems="flex-end">
					<Grid item>
						<AccountCircle />
					</Grid>
					<Grid item>
						<TextField id="input-with-icon-grid" label={placeholder} />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default AccountInput