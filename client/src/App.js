import React, { Component } from 'react';
import './App.css';

import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3001/jobs';

// Mock JSON Data
// const mockJobs = [
//   {title: 'SWE 1', company: 'Google'},
//   {title: 'SWE 1', company: 'Facebook'},
//   {title: 'SWE 1', company: 'Apple'},
//   {title: 'SWE 1', company: 'Amazon'},
// ]

async function fetchJobs(updateCallback) {
  console.log("In fetchJobs");
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCallback(json);

  console.log({json});
}


function App(){

  const [jobsList, updateJobs] = React.useState([])

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])
  
  return (
    <div className="App">
      
      <Jobs jobs={jobsList}/>
    </div>
  );
  
}

export default App;
