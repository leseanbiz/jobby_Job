import React from 'react';
import './App.css';
import Jobs from './components/Jobs'

const JOB_API_URL = 'http://localhost:3001/jobs';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
}

function App() {

  const [jobsList, updateJobsList] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobsList);
  },[]);

  return (
    //add suspense/lazy loading
    <div className="App">
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;

// const mockJobs = [
//   {
//     id: 'swe-1',
//     company: 'Google',
//     title: 'Front-End Developer',
//   },
//   {
//     id: 'swe-2',
//     company: 'AirBNB',
//     title: 'Front-End Developer',
//   },
//   {
//     id: 'swe-3',
//     company: 'Spotify',
//     title: 'Front-End Developer',
//   },
//   {
//     id: 'swe-4',
//     company: 'Facebook',
//     title: 'Front-End Developer',
//   },
// ]
