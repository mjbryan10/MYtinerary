import React from 'react';

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
	createStyles({
		controlsContainer: {
			display: "flex",
			flexFlow: "row wrap",
            width: "100%",
            maxWidth: "800px",
            justifyContent: "center",
			// color: "blue",
		},
	})
);

export default function DestinationControls(props: any) {
    const classes = useStyles();
    const { slideIndex, slideLength, onButtonClick } = props;
    const handleClick = (e: any) => {
        e.preventDefault();
        onButtonClick(e.target.value);
    }
    return (
        <div className={classes.controlsContainer}>
            <button onClick={handleClick} value="left">Left</button>
            {[...Array(slideLength)].map((element, index) => {
                return(
                    (slideIndex === index) ? <span>(*)</span> : <span>*</span>
                    )
                })}
                <button onClick={handleClick} value="right">Right</button>
        </div>
    )
}
