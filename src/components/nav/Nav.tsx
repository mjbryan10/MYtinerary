import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//MATERIAL UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from '@material-ui/core/Typography';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//REDUX
import { connect } from "react-redux";
import {
	updateLoginStatus,
	// logUserOut
} from "../../store/actions/loginActions";
import { fetchCurrentUser as fetchCurrentUserAction } from "../../store/actions/userActions";
import { bindActionCreators } from "redux";

//MENU OPTIONS
import Drawer from "./Drawer";
// import Hamburger from './Hamburger';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		bar: {
			display: "flex",
			justifyContent: "space-between",
		},
	})
);

function Nav(props: any) {
	const classes = useStyles();

	//state
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const {
		loggedIn,
		token,
		details,
		updateLoginStatus,
		fetchCurrentUser,
		userSuccess,
	} = props;

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (e: any) => {
		setAnchorEl(null);
	};
	const handleLogOutClick = (event: any) => {
		event.preventDefault();
		handleClose(event);
		logOut();
	};
	const logOut = (): void => {
		window.localStorage.removeItem("session_token");
		updateLoginStatus();
	};
	useEffect(() => {
		updateLoginStatus();
		if (loggedIn) {
			fetchCurrentUser(token);
		}
	}, [fetchCurrentUser, loggedIn, token, updateLoginStatus]);
	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ margin: 0 }} color="secondary">
				<Toolbar className={classes.bar}>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={loggedIn ? handleLogOutClick : handleClose}>
								{loggedIn ? <Link to="/">Log out</Link> : <Link to="/login">Log in</Link>}
							</MenuItem>
							{loggedIn ? null : (
								<MenuItem onClick={handleClose}>
									<Link to="/create">Create Account</Link>
								</MenuItem>
							)}
						</Menu>
					</div>
					{userSuccess ? details.name : null}
					<Drawer />
					{/* <Hamburger /> */}
				</Toolbar>
			</AppBar>
		</div>
	);
}

const mapStateToProps = (state: any): object => {
	return {
		loggedIn: state.login.loggedIn,
		token: state.login.token,
		details: state.currentUser.details,
		userSuccess: state.currentUser.success,
		error: state.currentUser.error,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			updateLoginStatus,
			fetchCurrentUser: fetchCurrentUserAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
