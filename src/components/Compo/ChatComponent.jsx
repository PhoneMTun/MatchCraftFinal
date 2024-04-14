import React, { useEffect, useState } from 'react';
import { WebSocketService } from '../service/WebSocketService';

function ChatComponent() {
    const [message, setMessage] = useState('');
    const webSocketService = new WebSocketService('userId'); // Replace 'userId' with actual user ID.

    useEffect(() => {
        webSocketService.connect();
        // Other cleanup operations can go here
        return () => {
        // Disconnect or cleanup if necessary
        };
    }, [webSocketService]);

    const sendMessage = () => {
        webSocketService.sendMessage({text: message});
        setMessage('');
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatComponent;
