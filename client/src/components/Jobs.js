import React, { Component } from 'react';
import Job from './Job'
import { Typography } from '@material-ui/core';
import JobModal from '../components/JobModal';
import Stepper from '../components/Stepper';
import Switch from '../components/Switch';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false,
                   selectedJob: {},
                   switchState: {
                    partTime: true,
                    fullTime: true,
                    contract: false,
                  },
                  activeStep: 0,
                  jobsData: this.props.jobs
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // filterJobsbyType(jobs, name);
    this.setState({
      jobsData: this.props.jobs
    })
  }

  componentDidMount() {
    console.log("jobs:", this.props.jobs)
    // filterJobsbyType(jobs, name);
    this.setState({
      jobsData: this.props.jobs
    })
  }

  // loadState(jobs) {
  //   this.setState({
  //      jobsData: jobs
  //   })
  // }
  // filterJobsbyType (jobs, name) {
  //   // console.log("function called", name);
  //   // let partTimeJobs = [];
  //   // let fullTimeJobs = [];
  //   // let contractJobs = [];
  //   // let filteredJobs = [];

  //   if(name === 'partTime') {
  //     // partTimeJobs = jobs.filter(job => switchState.partTime === true && job.type === typeNamesArr[0]);
  //     setJobsData(jobs.filter(job => switchState.partTime === true && job.type === typeNamesArr[0]));
  //     // console.log('switch case: ', name, switchState.name, jobs[0].type);
  //   }
  //   if(name === 'fullTime'){
  //     // fullTimeJobs = jobs.filter(job => switchState.fullTime === true && job.type === typeNamesArr[1]);
  //     setJobsData(jobs.filter(job => switchState.fullTime === true && job.type === typeNamesArr[1]));
  //     // console.log('switch case: ', name, switchState.name, jobs[0].type);
  //   }        

  //   if(name === 'contract') {
  //     // contractJobs = jobs.filter(job => switchState.contract === true && job.type === typeNamesArr[2]);
  //     setJobsData(jobs.filter(job => switchState.contract === true && job.type === typeNamesArr[2]));
  //     // console.log('switch case: ', name, switchState.name, jobs[0].type);
  //   }
    
  //   return jobsData.length === 0 ? jobs : jobsData;
  // }

      handleChange(name, event) {
        // setSwitchState({ ...switchState, [name]: event.target.checked });
        this.setState({ 
          switchState: {...this.state.switchState, [name]: event.target.checked}
        });
        // filterJobsbyType(this.props.jobs, name);
      };

      //modal open and close
      handleModalOpen() {
        this.setState({
          open: true
        })
        // setOpen(true);
      }
  
      handleModalClose() {
        this.setState({
          open: false
        })
        // setOpen(false);
      }
      
      //pagination
      handleNext() {
        this.setState((prevState) => {
          return {activeStep: prevState.activeStep + 1}
        })
        // setActiveStep(prevActiveStep => prevActiveStep + 1);
        window.scrollTo(0, 0)
      }
  
      handleBack() {
        this.setState((prevState) => {
          return {activeStep: prevState.activeStep - 1}
        });
        // setActiveStep(prevActiveStep => prevActiveStep - 1);
        window.scrollTo(0, 0)
      }
  
  render() {
    console.log("jobsData:", this.state.jobsData);
    console.log("jobs render:", this.props.jobs)
    const {open, selectedJob, switchState, activeStep, jobsData } = this.state;
    const numJobs = this.props.jobs.length;
    const numPages = Math.ceil(numJobs/50);
    const jobsOnPage = this.props.jobs.slice( activeStep * 50, (activeStep * 50) + 50 );
    // console.log("switchState: ", switchState);

    //switches
    const typeNamesArr = ["Part Time", "Full Time", "Contract"];
    
    return (
      <div className='jobs'>
      <JobModal 
        open={open} 
        handleClose={() => this.handleModalClose()} 
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
      <Switch 
        handleChange={this.handleChange} 
        switchState={switchState}
        labelsArr={typeNamesArr}
      />
            <Stepper 
        numPages={numPages} 
        activeStep={activeStep} 
        handleNext={() => this.handleNext()} 
        handleBack={() => this.handleBack()}
      />
      {
        jobsOnPage.map(
          ( job,i ) => <Job key={i} job={job} onClick={() => {
                          this.handleModalOpen()
                          // selectJob(job)
                          this.setState({
                            selectedJob: job
                          });
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
        handleNext={() => this.handleNext()} 
        handleBack={() => this.handleBack()}
      />
        
      </div>
    );
  }
}

export default Jobs;



//OLD FUNCTION COMPONENT WITH HOOKS
// import React from 'react';
// import Job from './Job'
// import { Typography } from '@material-ui/core';
// import JobModal from '../components/JobModal';
// import Stepper from '../components/Stepper';
// import Switch from '../components/Switch';

// export default function Jobs({jobs}) {
  
//   // React.useEffect(() => {
//   //   filterJobsbyType(jobs);
//   //   // console.log(`You clicked 5 times`);
//   // },[jobs]);

//   //switches
//   const [switchState, setSwitchState] = React.useState({
//     partTime: true,
//     fullTime: true,
//     contract: false,
//   });
//   const [jobsData, setJobsData] = React.useState(jobs);

//   const typeNamesArr = ["Part Time", "Full Time", "Contract"];

//   const handleChange = name => event => {
//     setSwitchState({ ...switchState, [name]: event.target.checked });
//     filterJobsbyType(jobs, name);
//   };
  
//   function filterJobsbyType (jobs, name) {
//     // console.log("function called", name);
//     // let partTimeJobs = [];
//     // let fullTimeJobs = [];
//     // let contractJobs = [];
//     // let filteredJobs = [];

//     if(name === 'partTime') {
//       // partTimeJobs = jobs.filter(job => switchState.partTime === true && job.type === typeNamesArr[0]);
//       setJobsData(jobs.filter(job => switchState.partTime === true && job.type === typeNamesArr[0]));
//       // console.log('switch case: ', name, switchState.name, jobs[0].type);
//     }
//     if(name === 'fullTime'){
//       // fullTimeJobs = jobs.filter(job => switchState.fullTime === true && job.type === typeNamesArr[1]);
//       setJobsData(jobs.filter(job => switchState.fullTime === true && job.type === typeNamesArr[1]));
//       // console.log('switch case: ', name, switchState.name, jobs[0].type);
//     }        

//     if(name === 'contract') {
//       // contractJobs = jobs.filter(job => switchState.contract === true && job.type === typeNamesArr[2]);
//       setJobsData(jobs.filter(job => switchState.contract === true && job.type === typeNamesArr[2]));
//       // console.log('switch case: ', name, switchState.name, jobs[0].type);
//     }
    
//     return jobsData.length === 0 ? jobs : jobsData;
//   }

//   //pagination
//   console.log("jobsData: ", jobsData)
//   const numJobs = jobsData.length;
//   const numPages = Math.ceil(numJobs/50);
//   const [activeStep, setActiveStep] = React.useState(0);
//   const jobsOnPage = jobsData.slice( activeStep * 50, (activeStep * 50) + 50 );

//   function handleNext() {
//     setActiveStep(prevActiveStep => prevActiveStep + 1);
//     window.scrollTo(0, 0)
//   }

//   function handleBack() {
//     setActiveStep(prevActiveStep => prevActiveStep - 1);
//     window.scrollTo(0, 0)
//   }

//   //Modal
//   const [open, setOpen] = React.useState(false);
//   const [selectedJob, selectJob] = React.useState({});

//   function handleModalOpen() {
//     setOpen(true);
//   }

//   function handleModalClose() {
//     setOpen(false);
//   }

// //TODO add search for terms that go to algo. seperated by commas?
//   return (
//     <div className='jobs'>
//       <JobModal 
//         open={open} 
//         handleClose={handleModalClose} 
//         job={selectedJob} 
//       />
//       <Typography variant="h4" component="h1">
//         Entry level software jobs
//       </Typography>
//       <Typography variant="h6">
//         Found {numJobs} Jobs
//         {/* that fit {searchCriteria} */}
//       </Typography>
//       <Typography variant="h6" component="h1">
//         Showing {activeStep * 50} - {(activeStep * 50) + 50}
//       </Typography>
//       <Switch 
//         handleChange={() => handleChange()} 
//         switchState={switchState}
//         labelsArr={typeNamesArr}
//       />
//             <Stepper 
//         numPages={numPages} 
//         activeStep={activeStep} 
//         handleNext={() => handleNext()} 
//         handleBack={() => handleBack()}
//       />
//       {
//         jobsOnPage.map(
//           ( job,i ) => <Job key={i} job={job} onClick={() => {
//                           handleModalOpen()
//                           selectJob(job)
//                           }}
//                         />
//         )
//       }
//       <div>
//         Page { activeStep + 1 } of { numPages }
//       </div>
//       <Stepper 
//         numPages={numPages} 
//         activeStep={activeStep} 
//         handleNext={() => handleNext()} 
//         handleBack={() => handleBack()}
//       />
//     </div>
//   );
// }