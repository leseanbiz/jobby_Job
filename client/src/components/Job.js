import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { differenceInDays, differenceInMinutes } from 'date-fns';

export default function Job({ job, onClick }) {

  const today = new Date();
  const postedDate = new Date(job.created_at);

  function computeTimeDifference(current, other) {

    const minutes = Math.floor(differenceInMinutes(current, other));
    let hours = Math.floor(differenceInDays(current, other));
    const days = differenceInDays(current, other);

    if(minutes > 60 && hours < 24) {
      return `${hours} hours and ${minutes%60} minutes ago`;  
    }

    if(hours > 24){
      return `${days} days, ${hours%24} hours, and ${minutes%60} minutes ago`;
    }
    return `${minutes} minutes ago`;
  }

  return (
    <Paper className='job' onClick={onClick}>
      <div style={{ textAlign: "left" }}>
        <Typography variant="h6">{job.company}</Typography>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>{job.location}</Typography>
        <Typography>{job.type}</Typography>
      </div>
      <div style={{ textAlign: "right" }}>
        <Typography>{`${computeTimeDifference(today, postedDate)}`}</Typography>
      </div>
    </Paper>
  );
}