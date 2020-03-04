import React from "react";
import { Link } from "react-router-dom";

//MATERIAL UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuButton: {
			marginRight: theme.spacing(2),
		},
	})
);

function Hamburger() {
    const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
    };
    
	const handleClose = (e: any) => {
		setAnchorEl(null);
	};
	return (
		<div>
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
		</div>
	);
}

export default Hamburger;
