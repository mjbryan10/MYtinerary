import React from "react";
// import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() =>
   createStyles({
      controlsContainer: {
         display: "flex",
         flexFlow: "row wrap",
         width: "100%",
         maxWidth: "800px",
         justifyContent: "center",
         alignItems: "center",
         height: "25px",
         padding: "2px",
         "& > *": {
            margin: "0 2px",
         },
         // color: "blue",
      },
      buttonControls: {
			height: "25px",
			padding: 0,
         "& .MuiButton-startIcon": {
            margin: 0,
         },
         "& *": {
            pointerEvents: "none",
         },
      },
   })
);

export default function DestinationControls(props: any) {
   const classes = useStyles();
   const { slideIndex, slideLength, onButtonClick, onSpanClick } = props;
   const handleClick = (e: any) => {
      e.preventDefault();
      if (e.target.value) {
         onButtonClick(e.target.value);
      } else {
         console.log("handleClick -> e.target.key", e.target.getAttribute("data-index"));
         onSpanClick(parseInt(e.target.getAttribute("data-index"), 10));
      }
   };
   return (
      <div className={classes.controlsContainer}>
         <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            value="left"
            // startIcon={<NavigateBeforeIcon />}
            className={classes.buttonControls}
         >
            <NavigateBeforeIcon />
         </Button>
         {[...Array(slideLength)].map((element, index) => {
            return slideIndex === index ? (
               <span
                  onClick={handleClick}
                  key={index}
                  data-index={index}
                  className="span-dot current"
               ></span>
            ) : (
               <span
                  onClick={handleClick}
                  key={index}
                  data-index={index}
                  className="span-dot"
               ></span>
            );
         })}
         <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            value="right"
            // startIcon={<NavigateNextIcon />}
            className={classes.buttonControls}
         >
            <NavigateNextIcon />
         </Button>
      </div>
   );
}
