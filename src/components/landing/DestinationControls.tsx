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
            alignItems: 'center',
            height: "25px",
            padding: '2px',
            '& > *': {
                margin: '0 2px'
            }
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
                    (slideIndex === index) ? <span key={index} className="span-dot current"></span> : <span key={index} className="span-dot"></span>
                    )
                })}
                <button onClick={handleClick} value="right">Right</button>
        </div>
    )
}
