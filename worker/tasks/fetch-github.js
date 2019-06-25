var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();
const {promisify} = require('util');

const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

 console.log('fetching github: ');

 let resultCount = 1, onPage = 0;
 const allJobs = [];
 
 while(resultCount > 0){
  const res = await fetch(`${baseUrl}?page=${onPage}`)
  const jobs = await res.json();
  allJobs.push(...jobs);
  resultCount = jobs.length;
  console.log('resultCount: ', resultCount, 'jobs');
  onPage++;
 }

//filter algo
const jrJobs = allJobs.filter(job => {
  // console.log(job.created_at, job.id);
 const jobTitle = job.title.toLowerCase();
 
 if (
      jobTitle.includes("senior") ||
      jobTitle.includes("management") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect") ||
      jobTitle.includes("lead")
    ) {
     return false;
    }
 return true;

});


  //sort & remove dupes
  const sortedJobs = jrJobs;
  sortedJobs.sort(function (a,b) {
    return new Date(b.created_at) - new Date(a.created_at);
  })
  const sortedAndDedupedJobs = sortedJobs.filter((job, i) => {
    console.log(sortedJobs.id);
    const testIndex = i + 1;
    if(i === sortedJobs.length) {
      testIndex = sortedJobs.length;
    }
    // if(job.id === )
    return job.id !== sortedJobs[testIndex].id ? true : false; 
  })
  console.log([...new Set(jrJobs)].sort().length);
  console.log("sortedAndDedupedJobs.length: ", sortedAndDedupedJobs.length)


//set in redis
 // console.log('allJobs: ', allJobs.length, 'jobs');
 const success = await setAsync('github', JSON.stringify(jrJobs));
//  console.log('SortedJobs id1: ', sortedJobs[0].id);
//  console.log('JRJOBS id1: ', jrJobs[0].id);
//  console.log('ALLJOBS: ', allJobs.length);
 console.log({success}); 
}

fetchGithub();

module.exports = fetchGithub;