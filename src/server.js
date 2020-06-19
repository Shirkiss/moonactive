import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
const scheduler = require('./routes/scheduler');
const redisManager = require('./redisManager');

const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use('/', scheduler);

app.get('*', (req, res) => {
    res.sendFile(path.join('../public/index.html'));
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
    setInterval(redisManager.getMessage, 1000);
});