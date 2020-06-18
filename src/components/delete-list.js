import React from 'react';

const DeleteList = () => {


    const deleteAllMessages = async () => {
        await fetch(`/removeAll`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return (
        <div className="container">
            <button className="btn btn-primary" onClick={() => deleteAllMessages()}>Delete List</button>
        </div>
    );

};

export default DeleteList;
