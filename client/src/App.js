import React from 'react';
import './App.css';


const Jobs = React.lazy(() => import('./components/Jobs'));

const JOB_API_URL = 'http://localhost:3001/jobs';

function App() {

  const [jobsList, updateJobsList] = React.useState([]);

  React.useEffect(() => {
    const fetchJobs = async () => {
        // const res = await fetch(JOB_API_URL);
        // const json = await res.json()
        // console.log("json: ", json)
        // return json;
        fetch(JOB_API_URL)
          .then(resp => resp.json())
          .then(resp => updateJobsList(resp))
      }
      // updateJobsList(fetchJobs);
      fetchJobs();
  },[]);

  // console.log("jobsList App: ", jobsList)
  
  return (
    //add suspense/lazy loading
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Jobs jobs={jobsList} />
      </React.Suspense>
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
