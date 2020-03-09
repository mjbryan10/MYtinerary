import React from "react";
import { Link } from "react-router-dom";

//MATERIAL-UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			width: 250,
		},
		fullList: {
			width: "auto",
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
	})
);

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	type DrawerSide = "top" | "left" | "bottom" | "right";
	const toggleDrawer = (side: DrawerSide, open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent
	) => {
		if (
			event.type === "keydown" &&
			((event as React.KeyboardEvent).key === "Tab" ||
				(event as React.KeyboardEvent).key === "Shift")
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = (side: DrawerSide) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				<Link to={"/"} key="0">
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
				</Link>
				<Link to={"/cities"} key="1">
					<ListItem button>
						<ListItemIcon>
							<LocationCityIcon />
						</ListItemIcon>
						<ListItemText primary="Cities" />
					</ListItem>
				</Link>
				<Link to={"/favourites"} key="2">
					<ListItem button>
						<ListItemIcon>
							<ListAltIcon />
						</ListItemIcon>
						<ListItemText primary="Favourites" />
					</ListItem>
				</Link>
			</List>
		</div>
	);

	return (
		<div>
			{/* <Button onClick={toggleDrawer('left', true)}>Open Left</Button> */}
			{/* <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer> */}

			<Button
				onClick={toggleDrawer("right", true)}
				className={classes.menuButton}
				color="inherit"
			>
				<MenuIcon />
			</Button>
			{/* <Button onClick={toggleDrawer("right", true)}>Open Right</Button> */}
			<Drawer anchor="right" open={state.right} onClose={toggleDrawer("right", false)}>
				{sideList("right")}
			</Drawer>
		</div>
	);
}
