import React, { useEffect, useState } from 'react';

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    let [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages((messages) => [...messages, ...JSON.parse(e.data)]);
        });
    }, []);
    return (
        <div>
            <Messages messages={messages} />
            <AddMessageForm />
        </div>
    );
};

type MessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

const Messages: React.FC<{ messages: MessageType[] }> = ({ messages }) => {
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((message: MessageType, index: number) => (
                <Message message={message} />
            ))}
        </div>
    );
};

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
    return (
        <div>
            <img height={'50px'} src={message.photo} />
            {message.userName}
            <br />
            {message.message}
            <hr />
        </div>
    );
};

const AddMessageForm: React.FC = () => {
    let [message, setMessage] = useState('');
    const sendMessage = () => {
        if (!message) {
            return;
        }
        ws.send(message);
        setMessage('');
    };

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => {
                        setMessage(e.currentTarget.value);
                    }}
                    value={message}
                    cols={80}
                    rows={3}
                ></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    );
};

export default ChatPage;
