const express = require('express')
const app = express()
const fs = require('fs')
const Job = require('./mongodb')

app.all('/data', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.all('/json', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/data', async (req, res) => {
    let jobs = await Job.find()

    await res.send(jobs)

})

app.get('/json', (req, res) => {

    var data = fs.readFileSync('./1.json', 'utf8')
    // console.log(data);
    res.send(data)
})
app.use(express.static('../echart'))
app.listen(3000)
console.log('server is started at http://localhost:3000');