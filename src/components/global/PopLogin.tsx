import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
interface State {
   open: boolean;
   handlePopLogin: any;
}

const AlertDialog: React.FunctionComponent<State> = ({ open, handlePopLogin }) => {
	const handleClose = () => {
		handlePopLogin(false);
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Enjoy more of MyIntinerary"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You need an account for the full MyIntinerary experience.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="/login">
						<Button onClick={handleClose} color="primary">
							Login
						</Button>
					</Link>
					<Link to="/create">
						<Button onClick={handleClose} color="primary" autoFocus>
							Create account
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default AlertDialog