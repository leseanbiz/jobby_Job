import React, { Component } from 'react';
import Job from './Job'
import { Typography, Container, Grid, Card, GridList, CssBaseline } from '@material-ui/core';
import AppBar from '../components/AppBar';
import JobModal from '../components/JobModal';
import Stepper from '../components/Stepper';
import Switch from '../components/Switch';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

// import CheckboxesGroup from '../components/Checkboxes';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false,
                   selectedJob: {},
                   switchState: {
                    partTime: true,
                    fullTime: true,
                    contract: true,
                  },
                  activeStep: 0,
                  jobsData: this.props.jobs
    }
    this.handleChange = this.handleChange.bind(this);
    this.filterJobsbyType = this.filterJobsbyType.bind(this);
  }

  //sort jobs by time posted

  //add pie chart

  //add remote switch

  //add App bar for logo, title, found jobs

  //stack remote jobs and switches to the left of jobsList



  //pagination
  handleNext() {
    this.setState((prevState) => {
      return {activeStep: prevState.activeStep + 1}
    })
    window.scrollTo(0, 0)
  }

  handleBack() {
    this.setState((prevState) => {
      return {activeStep: prevState.activeStep - 1}
    });
    window.scrollTo(0, 0)
  }

  // set jobsData state array
  componentDidUpdate(prevProps) {
    if(prevProps.jobs !== this.props.jobs) {
      this.setState({ jobsData: this.props.jobs });
    }
  }

  //switch logic
  filterJobsbyType (name, checked) {
    let partTimeJobs = this.props.jobs.filter(job => job.type === 'Part Time');
    let fullTimeJobs = this.props.jobs.filter(job => job.type === 'Full Time');
    let contractJobs = this.props.jobs.filter(job => job.type === 'Contract');

    if(checked === false) {
      if(name === "partTime") { 
        partTimeJobs = [];
      }
      if(name === "fullTime" ) {
        fullTimeJobs = [];
      }
      if(name === "contract") {
        contractJobs = [];
      }
    }
    this.setState({ jobsData: [...partTimeJobs, ...fullTimeJobs, ...contractJobs] });
  }

  // switch event handler
  handleChange(name, event) {
    this.setState({ 
      switchState: { ...this.state.switchState, [name]: event.target.checked }
    });
    this.filterJobsbyType(name, event.target.checked);
  };

  //modal open and close
  handleModalOpen() {
    this.setState({
      open: true
    })
  }

  handleModalClose() {
    this.setState({
      open: false
    })
  }

  render() {
    const typeNamesArr = ["Part Time", "Full Time", "Contract"];
    const {open, selectedJob, switchState, activeStep, jobsData } = this.state;
    const numJobs = jobsData.length;
    const numPages = Math.ceil(numJobs/50);
    const jobsOnPage = jobsData.slice( activeStep * 50, (activeStep * 50) + 50 );
    const remoteJobs = jobsData.filter(job => job.location.includes("Remote"));
    
    return (
      <div className='jobs'>
        {/* <CssBaseline /> */}
        <JobModal 
          open={open} 
          handleClose={() => this.handleModalClose()} 
          job={selectedJob} 
        />
        <AppBar numJobs={numJobs} />
          <Grid container>
            <Grid item xs={12}>
              <Stepper 
                numPages={numPages} 
                activeStep={activeStep} 
                handleNext={() => this.handleNext()} 
                handleBack={() => this.handleBack()}
              />
              <Typography variant="h6" component="h1">
                Showing {activeStep * 50} - {(activeStep * 50) + 50}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card>
                  <Switch 
                    handleChange={this.handleChange} 
                    switchState={switchState}
                    labelsArr={typeNamesArr}
                  />
                </Card>
                <br />
                <Card>
                  <Typography variant="h6">
                    Remote jobs count
                  </Typography>
                  <ReactMinimalPieChart
                    data={[
                      {
                        title: 'Remote',
                        value: remoteJobs.length,
                        color: '#E38627'
                      },
                      {
                        title: 'Non-remote',
                        value: (jobsData.length - remoteJobs.length),
                        color: '#C13C37'
                      }
                    ]}
                    lineWidth={15}
                    rounded
                    label
                    labelStyle={{
                      fontSize: '10px',
                      fontFamily: 'sans-serif'
                    }}
                    style={{height:'200px'}}
                    labelPosition={60}
                    animate
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} className={"flex-col-scroll"}>
                {
                  jobsOnPage.map(
                    ( job,i ) => <Job key={i} job={job} onClick={() => {
                                    this.handleModalOpen()
                                    this.setState({
                                      selectedJob: job
                                    });
                                  }}
                                  />
                  )
                }
              </Grid>
            </Grid>
          <Grid item xs={12}>
            <div>
              Page { activeStep + 1 } of { numPages }
            </div>
            <Stepper 
              numPages={numPages} 
              activeStep={activeStep} 
              handleNext={() => this.handleNext()} 
              handleBack={() => this.handleBack()}
            />
          </Grid>
        
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