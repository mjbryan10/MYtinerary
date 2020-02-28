import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

type spinnerProps = {
  height?: string;
  width?: string;
}

const Spinner: React.FunctionComponent<spinnerProps> = ({height, width}) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{height, width}}>
      <CircularProgress />
    </div>
  );
}
export default Spinner;