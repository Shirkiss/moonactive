import redis from "redis";
const express = require('express');
const router = express.Router();
const redisManager = require('../redisManager');

const client = redis.createClient();


// this is for testing. you can use this endpoint to set the delay in second you want to get the message
router.post('/testEchoAtTime', async (req, res) => {
    const delay = req.body.delay;
    const message = req.body.message;
    const time = new Date();
    time.setSeconds( time.getSeconds() + delay );

    await redisManager.scheduleMessage(message, time.getTime());

    res.send({message: "Success"});
});


// get time in milliseconds
router.post('/echoAtTime', async (req, res) => {
    const time = req.body.time;
    const message = req.body.message;
    await redisManager.scheduleMessage(message, time);

    res.send({message: "Success"});
});

// get time in milliseconds
router.get('/getAllMessages', async (req, res) => {
    client.zrange('processed', 0, -1, (err, reply)=> {
        res.send({messages: reply})
    });
});

// remove all existing messages
router.get('/removeAll', async (req, res) => {
    client.flushdb(()=> {
        res.send({messages: "Successfully deleted"})
    });
});



module.exports = router;