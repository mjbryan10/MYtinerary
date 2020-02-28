import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		typography: {
			padding: theme.spacing(2),
		},
	})
);
type PopoverProps = {
    textString: string;
    elementAnchor: HTMLElement | null;
}

const SimplePopover: React.FC<PopoverProps> = ({textString, elementAnchor}) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	//     setAnchorEl(event.currentTarget);
	//   };

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

    React.useEffect(() => {
        setAnchorEl(elementAnchor)
    }, [elementAnchor])
	return (
		<div>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography className={classes.typography}>{textString}</Typography>
			</Popover>
		</div>
	);
}
export default SimplePopover;
