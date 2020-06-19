import redis from "redis";

const client = redis.createClient(6379, 'ec2-18-188-173-117.us-east-2.compute.amazonaws.com', {
    no_ready_check: true
});


const scheduleMessage = async (message, time) => {
    const data = {time: time, message: message};
    await client.zadd("pending", time, JSON.stringify(data), () => {
        console.log(`Scheduled a new message to be sent at ${new Date(time)}`);
    });
};

const getMessage = async () => {
    try {
        const now = new Date().getTime();
        await client.zrange("pending", 0, 1, async (err, reply) => {
            if (reply) {
                reply.forEach((element) => {
                    const key = JSON.parse(element).time;
                    if (key < now) {
                        const message = JSON.parse(element).message;
                        client.zadd("processed", key, JSON.stringify(element));
                        client.zrem("pending", element);
                        console.log(message);
                    }
                })
            }
        });
    } catch (err) {
        throw(err);
    }
};



module.exports = {scheduleMessage, getMessage};