import React, {useEffect, useState} from 'react';
import './App.css';
import AddDelayedMessageForm from "./components/add-delayed-message-form";
import MessagesList from "./components/messages-list";
import DeleteList from "./components/delete-list";


function App() {
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/getAllMessages`);
            const body = await result.json();
            setMessagesList(body.messages);
        };
        fetchData();
    });


    return (
        <div className="App">
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://github.com/Shirkiss/moonactive" target="_blank">Link to GitHub project</a>
            <AddDelayedMessageForm/>
            <MessagesList messages={messagesList} setMessagesList={setMessagesList}/>
            <DeleteList/>
        </div>
    );
}

export default App;
