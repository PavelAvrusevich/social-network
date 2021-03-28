import React, { useEffect, useState } from 'react';

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

const Chat: React.FC = () => {
    let [ws, setWS] = useState<null | WebSocket>(null);
    useEffect(() => {
        let ws: null | WebSocket = null;
        function connectWS() {
            ws?.removeEventListener('close', onClose);
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', onClose);
            setWS(ws);
        }
        const onClose = () => {
            setTimeout(connectWS, 3000);
        };
        connectWS();
        return () => {
            ws?.removeEventListener('close', onClose);
            ws?.close();
        };
    }, []);

    return (
        <div>
            <Messages ws={ws} />
            <AddMessageForm ws={ws} />
        </div>
    );
};

type MessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    let [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            setMessages((messages) => [...messages, ...JSON.parse(e.data)]);
        };
        ws?.addEventListener('message', onMessage);
        return () => {
            ws?.removeEventListener('message', onMessage);
        };
    }, [ws]);
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

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    let [message, setMessage] = useState('');
    let [isWebSocketReady, setIsWebSocketReady] = useState('pending');

    useEffect(() => {
        const onOpen = () => setIsWebSocketReady('ready');
        ws?.addEventListener('open', onOpen);
        return () => {
            ws?.removeEventListener('open', onOpen);
        };
    }, [ws]);

    const sendMessage = () => {
        if (!message) {
            return;
        }
        ws?.send(message);
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
                <button disabled={isWebSocketReady === 'pending'} onClick={sendMessage}>
                    send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
