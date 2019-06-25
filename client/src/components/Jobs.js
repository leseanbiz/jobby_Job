import React from 'react';
import Job from './Job'
import { Typography } from '@material-ui/core';
import JobModal from '../components/JobModal';
import Stepper from '../components/Stepper';


export default function Jobs({jobs}) {

  // jobs.sort(function(a,b){
  //   return new Date(b.created_at) - new Date(a.created_at);
  // });
  
  
  //pagination
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs/50);
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice( activeStep * 50, (activeStep * 50) + 50 );

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    window.scrollTo(0, 0)
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    window.scrollTo(0, 0)
  }

  //Modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});

  function handleClickOpen() {
    setOpen(true);
    console.log(open);
  }

  function handleClose() {
    setOpen(false);
  }
//TODO add search for terma that go to algo. seperated by commas?
  return (
    <div className='jobs'>
      <JobModal 
        open={open} 
        handleClose={handleClose} 
        job={selectedJob} 
      />
      <Typography variant="h4" component="h1">
        Entry level software jobs
      </Typography>
      <Typography variant="h6">
        Found {numJobs} Jobs
        {/* that fit {searchCriteria} */}
      </Typography>
      <Typography variant="h6" component="h1">
        Showing {activeStep * 50} - {(activeStep * 50) + 50}
      </Typography>
      {
        jobsOnPage.map(
          ( job,i ) => <Job key={i} job={job} onClick={() => {
                          handleClickOpen()
                          selectJob(job)
                          }}
                        />
        )
      }
      <div>
        Page { activeStep + 1 } of { numPages }
      </div>
      <Stepper 
        numPages={numPages} 
        activeStep={activeStep} 
        handleNext={() => handleNext()} 
        handleBack={() => handleBack()}
      />
    </div>
  );
}

//props to stepper - steps={numPages}, activeStep={activeStep}, onClick={handleNext}, onClick={handleBack}