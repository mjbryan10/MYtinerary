import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
            flexGrow: 1,
		},
		menuButton: {
            marginRight: theme.spacing(2),
        },
        bar: {
            // background: 'linear-gradient(45deg, #dc2b00 30%, #FF8E53 90%)',
            display: 'flex',
            justifyContent: 'space-between'
        }
		// title: {
		// 	flexGrow: 1,
		// },
	})
);

export default function Nav() {
	const classes = useStyles();
	// const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setAuth(event.target.checked);
	// };

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
        console.log("TCL: handleMenu -> event.currentTarget", event.currentTarget);
	};

	const handleClose = (e: any) => {
		console.log(e.target)
		setAnchorEl(null);
	};
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
							<MenuItem onClick={handleClose}>
								<Link to="/login">Log in</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link to="/create">Create Account</Link>
							</MenuItem>
						</Menu>
					</div>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}
// <div className="login-container">
// 	<p>Want to build your won MYtinerary?</p>
// 	<Link to="/login">Log in</Link>
// 	<Link to="/create">Create Account</Link>
// </div>
