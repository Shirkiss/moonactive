import React, {useState} from 'react';

const AddDelayedMessageForm = () => {

    const [messageText, setMessageTest] = useState('');
    const [delay, setDelay] = useState('');

    const addDelayedMessage = async () => {
        const result = await fetch(`/testEchoAtTime`, {
            method: 'post',
            body: JSON.stringify({message: messageText, delay: parseInt(delay, 10)}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(result.json());
        setMessageTest('');
        setDelay('');
    };

    return (
        <div className="container">
            <h2>Add Delayed Message</h2>
            <form>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea rows="4" cols="50" className="form-control" value={messageText}
                              onChange={(event) => setMessageTest(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Delay in second for displaying the message:</label>
                    <input className="form-control" value={delay} onChange={(event) => setDelay(event.target.value)}/>
                </div>
                <button className="btn btn-primary" onClick={() => addDelayedMessage()}>Add Message</button>
            </form>
        </div>
    );

};

export default AddDelayedMessageForm;
