var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

// base url no query
const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub(){

    let resultCount = 1, onPage = 0, totalJobs = 0;
    const allJobs = [];
    console.log("fetching github");

    // fetch all pages
    while(resultCount > 0){
        // baseURL + query on page number
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        totalJobs += jobs.length;
        console.log('got', jobs.length, 'jobs');
        onPage ++;

    }

    // filter out unwanted titles
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        const jobType = job.type.toLowerCase();

        // filter logic, senior level
        if (
            jobTitle.includes('senior') || 
            jobTitle.includes('sr.') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('architect') ||
            jobTitle.includes('devops') ||
            jobTitle.includes('php') ||
            jobTitle.includes('master') ||
            jobTitle.includes('principal') ||
            jobTitle.includes('lead') ||
            jobType.includes('contract')
            
            
        ){
            return false
        }
        return true;
    })

    console.log('got', totalJobs, 'total jobs');
    console.log('filtered down to jr jobs: ', jrJobs.length);

    // set in redis
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
    
}

module.exports = fetchGithub;