import express from 'express';
import bodyParser from 'body-parser';
const scheduler = require('./routes/scheduler');
const redisManager = require('./redisManager');


const app = express();

app.use(bodyParser.json());
app.use('/', scheduler);


app.listen(8000, () => {
    console.log('Listening on port 8000');
    setInterval(redisManager.getMessage, 1000);
});