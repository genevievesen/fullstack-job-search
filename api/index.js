const express = require('express')
const app = express()

// 3001 because front end is running on 3000
const port = 3001

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {

    console.log('Get from redis');
    const jobs = await getAsync('github');
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    console.log('getting');

    return res.send(jobs)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))