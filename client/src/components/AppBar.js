import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
 root: {
   flexGrow: 1,
 }
}));

export default function SimpleAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ top: '50' }}>
        <Toolbar>
         <Grid
          container
          justify="space-between"
          spacing={24}
         >
          <Grid item>
           <Typography variant="h5" component="h1">
            Entry level software jobs
           </Typography>
          </Grid>
           <Grid item>
            <Typography variant="h6">
              Found {props.numJobs} Jobs
            </Typography>
           </Grid>
         </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}