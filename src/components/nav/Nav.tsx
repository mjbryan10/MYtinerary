import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import { tokenStatus } from "../../store/actions/loginActions";
import { fetchCurrentUser as fetchCurrentUserAction } from "../../store/actions/userActions";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		bar: {
			// background: 'linear-gradient(45deg, #dc2b00 30%, #FF8E53 90%)',
			display: "flex",
			justifyContent: "space-between",
		},
		// title: {
		// 	flexGrow: 1,
		// },
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
		expired,
		error,
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
	useEffect(() => {
		if (expired) {
			alert(error);
			logOut();
		}
	});
	return (
		<div className={classes.root}>
			<AppBar position="static" style={{ margin: 0 }}>
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

					<IconButton
						edge="start"
						aria-controls="hamburger-appbar"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={handleMenu}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="hamburger-appbar"
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
						<MenuItem onClick={handleClose}>
							<Link to="/cities">View Cities</Link>
						</MenuItem>
					</Menu>
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
		expired: state.currentUser.expired,
		userSuccess: state.currentUser.success,
		error: state.currentUser.error,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			updateLoginStatus: tokenStatus,
			fetchCurrentUser: fetchCurrentUserAction,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
