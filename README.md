Fullstack job search app
React.js, Node and Redis

Fetch's jobs from Github Jobs API every hour per cronjob. 
Filter set in code to fetch non-senior c++, python and embedded software jobs.

To Run: 
redis-server 		// Start Redis Server
node worker/index.js 	// Start worker
node api/index.js	// Start API
