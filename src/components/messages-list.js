import React from 'react';

const MessagesList = ({messages}) => (
    <>
        <h3>Messages:</h3>
        {messages.map((message, key) => (
            <div className="message" key={key}>
                <h4>{message}</h4>
            </div>
        ))}
    </>
);

export default MessagesList;